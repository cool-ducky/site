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
      content: 'Approving or denying will send an email to the user.',
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
              label: "Approve",
              style: 3,
              custom_id: JSON.stringify({id: data.user.id, approve: true}),
              emoji: { id: null, name: '✔️' }
            },
            {
              type: 2,
              label: "Deny",
              style: 4,
              custom_id: JSON.stringify({id: data.user.id, approve: false}),
              emoji: { id: null, name: '❌' }
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
