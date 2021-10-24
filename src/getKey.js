const axios = require('axios').default
const store = require('store')
module.exports = async(req, res) => {
    const code = req.query.code
    const codeData = await axios('https://discord.com/api/oauth2/token', {
        method: 'POST',
        data: new URLSearchParams({
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `http://localhost:500/callback`,
            scope: 'email',
        }),
    })
    const {data} = codeData
    await store.set('data', {token: data.access_token, refresh: data.refresh_token})
   res.send(codeData.data)
}