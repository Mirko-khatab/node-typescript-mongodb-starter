import { Request, Response } from "express" // Import Request and Response types from Express
import UserModal from "./users.model"
import { USER_UTILS } from "./users.utils"

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModal.find({})
    return res.status(200).send({
      message: "Get Users successfully",
      success: true,
      users,
    })
  } catch (error) {
    return res.status(500).send({
      message: "Server Error",
      success: false,
      error,
    })
  }
}

const CONTROLLERS = {
  getUsers,
}

export default CONTROLLERS
