const express = require('express');
var cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.port || 5000;


// app.use(cors());

console.log(process.env.DB_PASS);

const alltoys = require('./data/toys.json')
const ironman = require('./data/category/ironman.json')
const spiderman = require('./data/category/spiderman.json')
const galaxy = require('./data/category/galaxy.json')

// const toys
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(cors())
app.use(express.json());




// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5jzuigy.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5jzuigy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const toyadd = client.db("addtoyDB").collection("addtoy")

        app.get('/addtoy', async (req, res) => {
            const cursor = toyadd.find()
            const result = await cursor.toArray();
            res.send(result);

        })


        app.post('/addtoy', async (req, res) => {
            const toy = req.body;
            console.log('new Toy', toy);
            const result = await toyadd.insertOne(toy);
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);








app.get('/alltoys', (req, res) => {
    res.send(alltoys)
})


app.get('/ironman', (req, res) => {
    res.send(ironman)
})
app.get('/spiderman', (req, res) => {
    res.send(spiderman)
})
app.get('/galaxy', (req, res) => {
    res.send(galaxy)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})