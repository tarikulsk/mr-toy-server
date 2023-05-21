const express = require('express');
var cors = require('cors')
const app = express();
const port = process.env.port || 5000;


// app.use(cors());

const alltoys = require('./data/toys.json')

// const toys
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(cors())

app.get('/recipes', (req, res) => {
    res.send(recipes)
})
app.get('/alltoys', (req, res) => {
    res.send(alltoys)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})