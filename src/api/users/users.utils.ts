import bcrypt from "bcryptjs"
import crypto from "crypto"
import { GenTokenProps } from "./users.types.d"
import UserModal from "./users.model"
import { uuid } from "uuidv4"
import mongoose from "mongoose"
import jwt_decode from "jwt-decode"
import jwt from "jsonwebtoken"

const createHashPassword = async ({ password }: any) => {
  const salt = await bcrypt.genSalt(10)
  password = await bcrypt.hash(password, salt)
  return password
}

const genSessionToken = async () => {
  try {
    let token = await uuid().replace(/-/g, "")
    return token && token
  } catch (error) {
    console.log("genSessionToken error:", error)
  }
}

const encrypt = (
  tokenToEncrypted: string | any,
  encryptionKey: string | any
): string => {
  const algorithm = "aes-256-cbc"
  const key = crypto
    .createHash("sha256")
    .update(encryptionKey)
    .digest("base64")
    .substr(0, 32)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(tokenToEncrypted, "utf8", "hex")
  encrypted += cipher.final("hex")
  return iv.toString("hex") + encrypted
}

const decrypt = (encrypted: string, encryptionKey: string | any): string => {
  const algorithm = "aes-256-cbc"
  const key = crypto
    .createHash("sha256")
    .update(encryptionKey)
    .digest("base64")
    .substr(0, 32)
  const iv = Buffer.from(encrypted.slice(0, 32), "hex")
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encrypted.slice(32), "hex", "utf8")
  decrypted += decipher.final("utf8")
  return decrypted
}

const genToken = async (props: GenTokenProps): Promise<any> => {
  const { _id } = props

  const sessionToken = await genSessionToken()
  const encryptedSessionToken = await encrypt(
    sessionToken,
    process.env.ENCRYPTION_KEY
  )

  const encrypted_ID = await encrypt(_id.toString(), process.env.ENCRYPTION_KEY)
  await UserModal.updateOne({ _id }, { sessionToken: sessionToken })

  // Sign the token with the encrypted payload
  const token = jwt.sign(
    { _id: encrypted_ID, sessionToken: encryptedSessionToken },
    process.env.JWT_SECRET_KEY || ""
  )
  return token
}

const getUser = async (token: string) => {
  // decode token and get user info and exp
  if (token === null || token === undefined || token === "") return undefined
  const decoded: any = jwt_decode(token)
  const decrypted_ID = await decrypt(decoded?._id, process.env.ENCRYPTION_KEY)
  const _id = new mongoose.Types.ObjectId(decrypted_ID)
  const user: any = await UserModal.findOne({
    _id,
  })
  const decryptedSessionToken = await decrypt(
    decoded.sessionToken,
    process.env.ENCRYPTION_KEY
  )
  return user?.sessionToken == decryptedSessionToken ? user : null
}

export const USER_UTILS = {
  createHashPassword,
  genToken,
  getUser,
}
