// use express
import express from "express"
// import color to use in the console.
import "colors"
// use dotenv to get the environment variables.
require("dotenv").config()
// make app
const app = express()
// port
const port = process.env.PORT || 1402 // default port to listen
// make body parser
const cors = require("cors")
// body parser
const bodyParser = require("body-parser")
// body parser
app.use(
  bodyParser.json({
    verify: (req: any, res: any, buf: any, encoding: any) => {
      if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || "utf8")
      }
    },
  })
)
// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
// cors
app.use(cors())
// routers
app.use("/api", require("./routes"))
// for listening
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
