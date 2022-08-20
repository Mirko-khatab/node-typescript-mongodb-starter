import express from "express"
// router
const Router = express.Router()
// middleware
// import isAdmin from "../middleware/isAdmin"
// controllers
import sendMessage from "../controllers/broadcast/calculateUser"

Router.post("/user", (req, res) => {
  sendMessage(req, res)
})

module.exports = Router
