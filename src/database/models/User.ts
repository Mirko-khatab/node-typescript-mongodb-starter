import mongoose from "mongoose"
import { User as UserType } from "../../../types"
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
// comparePassword
userSchema.methods.comparePassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password)
  return result
}
// hashPassword to encrypt password
userSchema.pre("save", async function (next) {
  const user = this
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})
// not return this data's
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.token
  delete userObject.secret
  return userObject
}
const User = mongoose.model<UserType>("user", userSchema)
export default User
