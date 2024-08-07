
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");
require('dotenv').config({ path: './src/.env' })



const validateToken = (async (req, res, next) => {



    // const { token } = req.cookies
    // console.log(req.cookies)
    // const token = req.session.token
    const { username } = req.body


    try {
        const userToken = await userModel.findOne({ username: username });
        console.log(username)
        const token = userToken.token
        console.log(userToken.token)
        if (!token) {
            { res.status(401).json({ message: "Token no encontrado.Autorización denegada" }); }
            console.log("Token no encontrado.Autorización denegada")
        } else {
            jwt.verify(token, process.env.token_secret, (error, decoded) => {

                if (error) { res.status(401).json({ "mensage:Autorización denagada tras comprobar token": error }); }

                else {


                    req.user = decoded


                    console.log(decoded)

                    next()
                }
            })
        }
    } catch (err) {
        console.error('Error occurred while finding the user:', err);
    }





    // console.log(token)
    // if (!token) { res.status(401).json({ message: "Token no encontrado.Autorización denegada" }); }

    // else {


    //     jwt.verify(token, process.env.token_secret, (error, decoded) => {

    //         if (error) { res.status(401).json({ "mensage:Autorización denagada tras comprobar token": error }); }

    //         else {


    //             req.user = decoded


    //             console.log(decoded)

    //             next()
    //         }
    //     })
    // }




})



module.exports = { validateToken }