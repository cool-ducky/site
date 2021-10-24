const express = require('express')
require('dotenv').config()
const axios = require('axios').default
const store = require('store')
const getKey = require('./src/getKey')
const app = express();
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	console.log(store.get('data'))
	res.sendFile('home.html', {root: './public/html'})
})


app.get('/callback', (req, res) => {
	if(req?.query?.code) {
		getKey(req, res)
	} else {
		return res.send('error')
	}
})

app.listen(500, () => console.log('App listening at http://localhost:500'));