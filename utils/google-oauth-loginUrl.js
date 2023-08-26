const queryString = require("query-string")
require('dotenv').config()

const stringifiedParams = queryString.stringify({
  client_id: process.env.GOOGLE_CLIENT_ID,
  redirect_uri: 'http://localhost:3000/auth/google/callback',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email'
  ].join(' '), // space seperated string
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

module.exports = { googleLoginUrl }