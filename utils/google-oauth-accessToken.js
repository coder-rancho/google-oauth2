const axios = require('axios')

const getAccessTokenFromCode = async (code) => {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'http://localhost:3000/auth/google/callback',
      grant_type: 'authorization_code',
      code,
    },
  });
//   console.log(data); // { access_token, expires_in, token_type, refresh_token }
  return data.access_token;
};

module.exports = { getAccessTokenFromCode }