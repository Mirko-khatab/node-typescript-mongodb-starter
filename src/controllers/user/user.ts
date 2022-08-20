// import models
import User from "../../database/models/User"
// user
const user = async (req: any, res: any) => {
  try {
    // get id from query
    const { id } = req.query
    // get user
    const user = await User.findById(id)
    // send response
    await res.status(200).json({
      message: "User found successfully",
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: "Something went wrong",
    })
  }
}
export default user
