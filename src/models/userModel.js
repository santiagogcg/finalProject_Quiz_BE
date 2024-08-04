// import mongoose from 'mongoose'

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    quizCompleted: String,
    score: Number,
    statusAnswers: String,
    timeSpent: Number,




}, { timestamps: true });

const userModel = mongoose.model('QuizUser', UserSchema);


module.exports = { userModel }

