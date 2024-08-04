const { userModel } = require("../models/userModel.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createToken } = require("../reuseFunctions/jwt.js")
const { validateToken } = require("../middlewares/validateToken.js")


require('dotenv').config();



const getAllUserProps = (async (req, res) => {

    try {
        const allUserProps = await userModel.find()
        res.json(allUserProps)



    } catch (error) {

        console.log(error)



    }



})



const getUserProps = (async (req, res) => {


    try {

        const userProps = await userModel.findOne({
            username: req.params.id

        })
        if (!userProps) return res.status(404).json({ message: "Props to be fetched not found for single User" })
        res.json(userProps)


    } catch (error) {
        console.log(error)



    }



})







const deleteUserProps = (async (req, res) => {


    try {
        const userProps = await userModel.findOneAndDelete({
            username: req.params.id


        })
        if (!userProps) return res.status(404).json({ message: "Props to be eliminated not found for single User" })
        res.json(userProps)



    } catch (error) {

        console - log(error)

    }



})


const updateUserProps = (async (req, res) => {
    const { username, quizCompleted, score, statusAnswers, timeSpent } = req.body

    // const passworHashed = await bcrypt.hash(password, 10)
    try {

        const userProps = await userModel.findOneAndUpdate({ username: req.params.id }, {
            username: username,
            quizCompleted: quizCompleted,
            score: score,
            statusAnswers: statusAnswers,
            timeSpent: timeSpent

        },

            { new: true })

        if (!userProps) return res.status(404).json({ message: "Props to be updated not found for single User" })
        res.json(userProps)



    } catch {



    }



})





























module.exports = { getUserProps, deleteUserProps, updateUserProps, getAllUserProps }