const nodemailer = require('nodemailer')
const appeals = require('./schema')
module.exports = async(req, res) => {
    const interaction = req.body
    const data = JSON.parse(interaction.data.custom_id)
    const appeal = await appeals.findOne({id: data.id})
    if(!appeal?.email) return res.send({
        type: 4,
        data: {
            flags: 64,
            content: 'Could not find appeal request in db.'
        }
    })
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'igp.ban.appeals@gmail.com',
            pass: process.env.email_password
        }
    });
    const subject = (data.approve) ? 'approved' : 'denied';
    const html = (data.approve) ? 'Your appeal has been approved by our staff team. Please be aware that any other offenses will result in a <b>permanet ban</b>. We are happy to have you back, feel free to join the server with this <a href="https://discord.gg/bMnmwax3Bv">link</a>!' : 'Sorry, but on behalf of the staff team, we feel that you should remain banned. If you feel that this was unfair please DM me.'
    const mailOptions = {
        from: 'igp.ban.appeals@gmail.com',
        to: appeal.email,
        subject: `Your appeal was ${subject}`,
        html: `<p>Dear ${appeal.user},<br><br>${html}<br><br>Sincerely,<br>Ducky#8930</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });

    return res.send({
        type: 7,
        data: {
            content: `${subject} by ${interaction.member.user.username}`,
            components: []
        }
    })
}