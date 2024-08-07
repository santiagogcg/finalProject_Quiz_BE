// import express from 'express'
const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const session = require("express-session")
const bodyParser = require("body-parser")
require('dotenv').config({ path: '/.env' })

// import authRoutes from "./routes/auth.routes.js"

const { router } = require("./routes/auth.routes.js")
const { routerProps } = require("./routes/prop.routes.js")

const app = express()

app.use(cors({
    origin:
        // 'http://localhost:5173',

        // "https://finalproject-quiz-fe.onrender.com",
        "https://quiz-ra-san.netlify.app",
    credentials: true

}))

app.use(bodyParser.json());
app.use(session({
    secret: 'prueba',      // Change this to a random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true if using https
}));


app.use(express.json())
app.use(cookieParser())


app.use(router)
app.use(routerProps)


module.exports = { app }