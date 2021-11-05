const axios = require('axios')
module.exports = (req, res) => {
    const data = req.body
    if (data.project.id !== process.env.project) return res.send('Access Denied!')
    const request = {
        embeds: [
            {
                title: data.type,
                description: `User: ${data.deployment.creator.name}`,
                thumbnail: {
                    url: data.deployment.creator.avatar
                },
                timestamp: data.timestamp,
                color: 0xde0552
            }
        ]
    }
    axios.post(process.env.hook, request)
}