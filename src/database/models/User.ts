import mongoose from "mongoose"
import { User as UserType } from "../../../types"
const userSchema = new mongoose.Schema<UserType>(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model<UserType>("User", userSchema)
export default User
