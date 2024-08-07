// import userModel from "../models/userModel.js"
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import dotenv from "dotenv"
// dotenv.config()

const { userModel } = require("../models/userModel.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createToken } = require("../reuseFunctions/jwt.js")
const { validateToken } = require("../middlewares/validateToken.js")

require('dotenv').config();





const login = (async (req, res) => {
    const { username, password } = req.body;
    try {

        const userFound = await userModel.findOne({ username })
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, userFound.password);

        if ((!isMatch) && (userFound)) return res.status(400).json({ message: `Contraseña Incorrecta.${username},ATINEMOS CON EL TECLADO POR FAVOR ` })
        if ((!isMatch) && (!userFound)) return res.status(400).json({ message: 'Contraseña Incorrecta' })

        const token = await createToken({ id: userFound._id })
        // res.cookie("token", token, {
        //     sameSite: 'None', // or 'Strict' or 'None'
        //     secure: false,    // Required if SameSite is 'None'
        //     httpOnly: false

        // })
        // req.session.token = token
        // res.json(userFound)

        const user = await userModel.findOneAndUpdate(
            { username: username },
            { token: token },
            { new: true } // Return the updated document
        );



        console.log(`Token saved for user ${user.username}: ${user.token}`);

        res.json({ token: token, username: userFound.username })



    } catch (error) {
        console.log(error)



    }



})


const register = (async (req, res) => {



    const { username, password, token, quizCompleted, score, statusAnswers, timeSpent } = req.body
    try {

        const passworHashed = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            username,
            password: passworHashed,
            quizCompleted,
            score,
            statusAnswers,
            timeSpent

        });
        await newUser.save()
        const token = await createToken({ id: newUser._id })
        // res.cookie("token", token, {
        //     sameSite: 'None', // or 'Strict' or 'None'
        //     secure: true,    // Required if SameSite is 'None'
        //     httpOnly: true

        // })
        // req.session.token = token
        res.json(newUser)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }



}

)





const logout = (async (req, res) => {

    try {

        // console.log(req.cookies)
        // res.cookie("token", token, {
        //     sameSite: 'None', // or 'Strict' or 'None'
        //     secure: true,    // Required if SameSite is 'None'
        //     httpOnly: true

        // })

        req.session.destroy
        res.status(200).json({ message: "Cierre de sesión realizado con éxito" })

    } catch (error) {

        console.log(error)


    }



})



const profile = (async (req, res) => {

    try {

        console.log("dentro profile")

        if (!req.user.id) { res.status(400).json({ message: "Usuario no encontrado" }) }

        const userFound = await userModel.findById(req.user.id)

        console.log(userFound.username)



        // else {



        // }



    } catch (error) {

        res.status(500).json(error)


    }

});


const profileAdmin = (async (req, res) => {

    try {

        console.log("Comprobando Admin")

        if (req.user.id != "669fe47e1a8b3607439a79db") { res.status(400).json({ message: "Usuario no encontrado" }) }

        const userFound = await userModel.findById(req.user.id)

        console.log(userFound.username)



        // else {



        // }



    } catch (error) {

        res.status(500).json(error)


    }

});






const verifyToken = async (req, res) => {


    try {

        console.log("Verify Token")

        // if (req.user.id != "669fe47e1a8b3607439a79db") { res.status(400).json({ message: "Usuario no encontrado" }) }

        const userFound = await userModel.findById(req.user.id)

        if (userFound) {
            console.log(userFound.username)

            console.log("Token VERIFIED")


            res.status(200).json(userFound)
        }


        else {

            return
            res.status(401).json("Usuario NO encontrado")
        }



    }


    catch (error) {

        res.status(500).json(error)


    }


    // try {

    //     const { token } = req.cookies

    //     console.log(token)
    //     if (!token) return res.status(401).json({ message: "Unauthorized as Token does not exist" });

    //     jwt.verify(token, process.env.token_secret, (err, user) => {

    //         console.log(user.id)
    //         if (err) return res.status(401).json({ message: "Unauthorized as Token is not accepted" });


    //         req.user = user

    //         const userFound = userModel.findById(user.id)


    //         console.log(userFound)

    //         if (!userFound) return res.status(401).json({ message: "Unauthorized as User is not found" });

    //         return res.json({
    //             id: userFound._id,
    //             username: userFound.username
    //         })
    //     })

    // } catch (error) {

    //     res.json.status(500)({ "mensage": error })
    // }
}














module.exports = { login, register, logout, profile, profileAdmin, verifyToken, logout }