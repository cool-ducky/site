const axios = require('axios')
module.exports = async (req, res) => {
try {
  res.json({requestBody: req.body})
  const data = req.body
  const request = {
    content: `**From:** ${data.user.username}#${data.user.discriminator}\n**Why banned?** ${data.ban}\n**Why unban?** ${data.unban}`
  }
  const hook = await axios.post(process.env.hook, request)
} catch(err) {
if(err) return res.send("huh")
}
}
