
const express = require('express')
const routerProps = express.Router();
const { getUserProps, deleteUserProps, updateUserProps, getAllUserProps } = require('../controllers/prop.controller.js')
const { validateToken } = require('../middlewares/validateToken.js')




routerProps.get("/api/props", validateToken, getAllUserProps)

routerProps.get("/api/props/:id", validateToken, getUserProps)


// routerProps.post("/api/props", validateToken, createUserProps)

routerProps.delete("/api/props/:id", validateToken, deleteUserProps)
routerProps.put("/api/props/:id", validateToken, updateUserProps)









module.exports = { routerProps }