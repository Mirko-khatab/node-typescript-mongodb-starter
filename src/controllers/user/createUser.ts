// import models
import User from "../../database/models/User"

// createUser
const createUser = async (req: any, res: any) => {
  try {
    // get user data
    const userData = req.body
    // create user
    const user = await User.create(userData)
    // send response
    res.status(201).json({
      message: "User created successfully",
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Something went wrong",
    })
  }
}
