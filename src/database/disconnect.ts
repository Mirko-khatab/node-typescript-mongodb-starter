import mongoose from "mongoose"
export const disconnect = async () => {
  try {
    // to disconnect
    await mongoose.disconnect()
    // disconnect console
    console.log("Database disconnect...".red)
  } catch (error) {
    // if we have error so return in error
    if (error instanceof Error) console.log(error.message.red)
  }
}
export default disconnect
