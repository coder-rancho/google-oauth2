const express = require('express')
const { googleLoginUrl } = require('./utils/google-oauth-loginUrl')
const { getAccessTokenFromCode } = require('./utils/google-oauth-accessToken')
const { getGoogleUserEmail } = require('./utils/google-oauth-userEmail')
const session = require('express-session')
require('dotenv').config()

const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req, res) => {
    if (!req.session.authorized) res.redirect('/auth/google/login')
    res.send(`Hello ${req.session.userId}`)
})

app.get('/auth/google/login', (req, res) => {
    res.redirect(googleLoginUrl)
})

app.get('/auth/google/callback', async (req, res) => {
    
    if (req.query.code == null) {
        res.send("Authorization code is not found.")
        return
    }

    const code = req.query.code
    const token = await getAccessTokenFromCode(code)
    const email = await getGoogleUserEmail(token)

    req.session.authorized = true
    req.session.userId = /* User.findOne({email}) || */ email

    res.send(email)
})

app.listen(3000, '0.0.0.0')