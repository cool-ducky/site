const axios = require('axios')
module.exports = async (req, res) => {
try {
  const data = req.body
  const request = {
    content: `**From:** ${data.user.username}#${data.user.discriminator}\n**Why banned?** ${data.ban}\n**Why unban?** ${data.unban}`
  }
  const hook = await axios.post(process.env.hook, request)
} catch(err) {
console.log(err)
if(err) return res.send("huh")
}
}
