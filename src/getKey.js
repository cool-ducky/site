const axios = require('axios').default
const store = require('store')
module.exports = async (req, res) => {
    const code = req.query.code
    if (!code) return res.send(JSON.stringify({msg: 'Invalid Code!'}))
    try {
        const codeData = await axios('https://discord.com/api/oauth2/token', {
            method: 'POST',
            data: new URLSearchParams({
                client_id: process.env.client_id,
                client_secret: process.env.client_secret,
                code,
                grant_type: 'authorization_code',
                redirect_uri: `https://imagine.cf/callback`,
                scope: 'email',
            }),
        })
        const { data } = codeData
        if (!data.access_token) return res.send(JSON.stringify({msg: 'Invalid Code!'}))
        const token = data.access_token
      const response = await axios({
                    method: 'GET',
                    url: 'https://discord.com/api/users/@me',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
      return res.send(JSON.stringify({msg: response.data}))
    } catch (err) {
        if (err) res.send(JSON.stringify({msg: 'Invalid Code!'}))
    }
}