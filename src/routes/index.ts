import express from "express"
// router
const Router = express.Router()
// controllers
import createUser from "../controllers/user/createUser"
import deleteUser from "../controllers/user/deleteUser"
import user from "../controllers/user/user"
import users from "../controllers/user/users"
import updateUser from "../controllers/user/updateUser"

//  make user
Router.post("/user", (req, res) => {
  createUser(req, res)
})
// delete user
Router.delete("/user", (req, res) => {
  deleteUser(req, res)
})
// update user
Router.put("/user", (req, res) => {
  updateUser(req, res)
})

// get user
Router.get("/user", (req, res) => {
  user(req, res)
})
// get all users
Router.get("/users", (req, res) => {
  users(req, res)
})
module.exports = Router