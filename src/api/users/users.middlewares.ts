import { USER_UTILS } from "./users.utils"

const checkUser = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization
    const user = await USER_UTILS.getUser(token)
    if (!user)
      return res.status(401).send({
        message: "you don't have account",
      })
    req.user = user
    next()
  } catch (error) {
    console.log("checkUser error:", error)
    return res.status(401).send({
      message: "you don't have account",
    })
  }
}

const checkIsMainUser = async (req: any, res: any, next: any) => {
  try {
    const { user } = req
    if (!user.isMainSuperAdmin)
      return res.status(401).send({
        message: "you don't have account",
      })
    next()
  } catch (error) {
    console.log("checkIsMainUser error:", error)
    return res.status(401).send({
      message: "you don't have account",
    })
  }
}

const masterRoleUser = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization

    if (token !== process.env.MASTER_ROLE) throw Error("you don't have account")

    next()
  } catch (error) {
    return res.status(401).send({
      message: "you don't have account",
    })
  }
}

// Define your middleware function
const checkUserPermission = (permissionToCheck) => {
  return async (req, res, next) => {
    try {
      const { user } = req
      let isPermissionFound = false

      //  check roles here

      if (!isPermissionFound)
        return res.status(500).send({
          message: "Server Error",
          success: false,
          error: "you don't have permission",
        })

      next()
    } catch (error) {
      return res.status(500).send({
        message: "Server Error",
        success: false,
        error,
      })
    }
  }
}

// Your Express route setup

export const USER_MIDDLEWARE = {
  checkUser,
  checkIsMainUser,
  masterRoleUser,
  checkUserPermission,
}
