// import express from 'express'
const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require("cors")

// import authRoutes from "./routes/auth.routes.js"

const { router } = require("./routes/auth.routes.js")
const { routerProps } = require("./routes/prop.routes.js")

const app = express()

app.use(cors({
    origin: ["https://finalproject-quiz-fe.onrender.com"],
    credentials: true

}))
app.use(express.json())
app.use(cookieParser())


app.use(router)
app.use(routerProps)


module.exports = { app }