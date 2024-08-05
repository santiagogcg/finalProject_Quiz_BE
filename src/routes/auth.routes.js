// import { Router } from 'express';
// import { login, register } from '../controllers/auth.controller.js';
const express = require('express')
const router = express.Router();
const { login, register, logout, profile, profileAdmin, verifyToken } = require('../controllers/auth.controller.js')
const { validateToken } = require('../middlewares/validateToken.js')




router.post("/api/register", register)

router.post("/api/login", login)


router.post("/api/logout", validateToken, logout)

router.get("/api/profile", validateToken, profile)
router.get("/api/profileAdmin", validateToken, profileAdmin)

router.get("/api/verifyToken", validateToken, verifyToken)










module.exports = { router }