// import models
import User from "../../database/models/User"
// updateUser
const updateUser = async (req: any, res: any) => {
  try {
    // get user data
    const userData = req.body
    // update user
    const user = await User.findByIdAndUpdate(userData.id, userData)
    // send response
    res.status(200).json({
      message: "User updated successfully",
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Something went wrong",
    })
  }
}
export default updateUser
