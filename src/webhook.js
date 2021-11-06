const axios = require('axios').default
module.exports = async (req, res) => {
  try {
    const data = req.body
    const request = {
      username: data.user.username,
      avatar_url: data.avatar,
      embeds: [
        {
          title: 'Unban Request',
          description: `**Why banned?**\n${data.ban}\n**Why unban?**\n${data.unban}`,
          footer: {
            text: data.user.id
          },
          color: 0x36393F
        }
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: "Send Email",
              style: 4,
              custom_id: data.user.id,
              emoji: '📧'
            }
          ]
        }
      ]
    }
    axios({
      data: request,
      method: 'POST',
      url: process.env.hook,
      headers: {
        'content-type': 'application/json'
      }
    })
  } catch (err) {
    console.log(err)
    if (err) return res.send('huh')
  }
}
