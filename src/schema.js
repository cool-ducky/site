const mongoose = require('mongoose')
const appealSchema = new mongoose.Schema({
    user: String,
    email: String,
    id: String
})
const appeal = mongoose.model('appeal', appealSchema)
module.exports = appeal