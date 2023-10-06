import express from "express"
const router = express.Router()

import CONTROLLERS from "./users.controllers"
import { USER_MIDDLEWARE } from "./users.middlewares"

router.get(
  "/",
  USER_MIDDLEWARE.checkUserPermission(["roles"]), // check user permission here
  CONTROLLERS.getUsers
)

export default router
