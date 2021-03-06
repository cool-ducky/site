const express = require('express')
const mongoose = require('mongoose')
const { verifyKeyMiddleware } = require('discord-interactions')
require('dotenv').config()
const axios = require('axios').default
const store = require('store')
const getKey = require('./src/getKey')
const app = express();
const path = require('path')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.post('/interactions', verifyKeyMiddleware(process.env.public_key), (req, res) => {
  const sendEmail = require('./src/sendEmail')
  sendEmail(req, res)
})

app.post('/hook', (req, res) => {
  const hook = require('./src/webhook')
  hook(req, res)
})

app.get('/', (req, res) => {
  res.sendFile('home.html', { root: './public/html' })
})


app.get("/jam", (req, res) => {
  res.sendFile("jam.html", {
    root: "./public/html"
  })
})

app.get('/callback', (req, res) => {
  res.sendFile('callback.html', { root: './public/html' })
})


app.get('/token', (req, res) => {
  const getToken = require('./src/getKey')
  getToken(req, res)
})


app.get('/appeals', (req, res) => {
  res.sendFile('appealMetaTag.html', { root: './public/html' })
})

app.get('*', function(req, res){
  res.sendFile('404.html', { root: './public/html' })
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
