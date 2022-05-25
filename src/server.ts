import express, { Application } from "express"
import cors from "cors"
import body from "body-parser"
import "dotenv/config"

const app: Application = express()
const port: number = parseInt(`${process.env.PORT}`) || 8000

app.use(cors())
app.use(body.json())
app.use(body.urlencoded({extended: false}))

//ROUTES
app.use(require("./routes/user"))
app.use(require("./routes/login"))
app.use(require("./routes/board"))
app.use(require("./routes/stage"))
app.use(require("./routes/task"))

//CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
})

app.listen(port, () => {
    return console.log("Server is running")
})