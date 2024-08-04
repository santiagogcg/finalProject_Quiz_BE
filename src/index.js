// import app from "./app.js";
// import { dbConnection } from "./db.js";
// import 'dotenv/config'

const { app } = require("./app.js")
const { dbConnection } = require("./db.js")
// require('dotenv').config();
require('dotenv').config({ path: './src/.env' })



const PORT = process.env.PORT || 3000



dbConnection()



app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
