const axios = require('axios').default
const appeal = require('./schema')
module.exports = async (req, res) => {
  try {
    const data = req.body
    if(!data?.user) return;
    await appeal.create({
      user: data.user.username,
      email: data.user.email,
      id: data.user.id
    })
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
              emoji: { id: null, name: '📧' }
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
