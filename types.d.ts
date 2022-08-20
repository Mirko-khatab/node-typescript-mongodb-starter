import { Document, Mongoose, SchemaTimestampsConfig } from "mongoose"

interface MongooseDoc extends Document, SchemaTimestampsConfig {}

// user type
interface User extends MongooseDoc {
  name: string
  username: string
  password: string
  role: "admin" | "user" | "guest" | "super-admin" | "manager"
  comparePassword: (password: string) => Promise<boolean>
}
