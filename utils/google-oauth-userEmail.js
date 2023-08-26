const axios = require('axios')

async function getGoogleUserEmail(access_token) {
  const { data } = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
//   console.log(data); // { id, email, given_name, family_name }
  return data.email;
}

module.exports = { getGoogleUserEmail }