const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './src/.env' })

function createToken(payload) {

    return new Promise((resolve, reject) => {

        jwt.sign(
            payload,
            process.env.token_secret,
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            }

        );

    });
}

module.exports = { createToken }