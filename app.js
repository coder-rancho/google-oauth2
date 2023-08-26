const express = require('express')
const { googleLoginUrl } = require('./utils/google-oauth-loginUrl')
const { getAccessTokenFromCode } = require('./utils/google-oauth-accessToken')
const { getGoogleUserEmail } = require('./utils/google-oauth-userEmail')

const app = express()

app.get('/', (req, res) => res.send('hello'))

app.get('/auth/google/login', (req, res) => {
    res.send(googleLoginUrl)
})

app.get('/auth/google/callback', async (req, res) => {
    
    if (req.query.code == null) {
        res.send("Authorization code is not found.")
        return
    }

    const code = req.query.code
    const token = await getAccessTokenFromCode(code)
    const email = await getGoogleUserEmail(token)

    res.send(email)
})

app.listen(3000, '0.0.0.0')