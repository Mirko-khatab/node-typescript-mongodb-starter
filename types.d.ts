import { Document, Mongoose, SchemaTimestampsConfig } from "mongoose"

interface MongooseDoc extends Document, SchemaTimestampsConfig {}

interface User extends MongooseDoc {
  userId: string
}
