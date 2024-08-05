
const jwt = require("jsonwebtoken")
require('dotenv').config({ path: './src/.env' })



const validateToken = ((req, res, next) => {



    const { token } = req.cookies
    console.log(req.cookies)
    console.log(token)
    if (!token) { res.status(401).json({ message: "Token no encontrado.Autorización denegada" }); }

    else {


        jwt.verify(token, process.env.token_secret, (error, decoded) => {

            if (error) { res.status(401).json({ "mensage:Autorización denagada tras comprobar token": error }); }

            else {


                req.user = decoded


                console.log(decoded)

                next()
            }
        })
    }




})



module.exports = { validateToken }