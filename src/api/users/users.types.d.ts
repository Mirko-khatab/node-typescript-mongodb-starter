import { Document, Mongoose, SchemaTimestampsConfig } from "mongoose"

interface MongooseDoc extends Document, SchemaTimestampsConfig {}

interface User extends MongooseDoc {
  username: string
  password: string
  isActive: boolean
  sessionToken: string
  comparePassword: (password: string) => Promise<boolean>
}

type GenTokenProps = {
  _id: string
}
