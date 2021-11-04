const express = require('express')
require('dotenv').config()
const axios = require('axios').default
const store = require('store')
const getKey = require('./src/getKey')
const app = express();
const bodyParser = require('body-parser');
const path = require('path')

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  res.redirect("https://discord.com/api/oauth2/authorize?client_id=900535112955998271&redirect_uri=https%3A%2F%2Fimagine.cf%2Fcallback&response_type=code&scope=email%20identify")
})

app.listen(port, () => console.log('App listening at http://localhost:500'));
