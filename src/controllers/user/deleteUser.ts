// import models
import User from "../../database/models/User"
// deleteUser
const deleteUser = async (req: any, res: any) => {
  try {
    //  get id from query
    const { id } = req.query
    // delete user
    await User.findByIdAndDelete(id)
    // send response
    await res.status(200).json({
      message: "User deleted successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Something went wrong",
    })
  }
}
export default deleteUser
