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

app.listen(port, () => {
    return console.log("Server is running")
})