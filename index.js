const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;

// Middle-Wire
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b4g6x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db('BookAndTravel').collection('services');
    const orderCollection = client.db('BookAndTravel').collection('orders');

    // Find Single Product
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.json(result);
    });

    //Find All Services
    app.get('/services', async (req, res) => {
      const cursor = serviceCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    //ADD A new Service
    app.post('/addService', async (req, res) => {
      const newService = req.body;
      const result = await serviceCollection.insertOne(newService);
      res.json(result);
    });

    //ADD  A Service
    app.post('/addService', async (req, res) => {
      const newService = req.body;
      const result = await serviceCollection.insertOne(newService);
      res.json(result);
    });

    // Add An Order
    app.post('/addOrder', async (req, res) => {
      const newOrder = req.body;
      const result = await orderCollection.insertOne(newOrder);
      res.json(result);
    });

    //Find all orders
    app.get('/allOrders', async (req, res) => {
      const cursor = orderCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    });

    //Find My Orders by email
    app.post('/myOrders/:email', async (req, res) => {
      const email = req.params.email;
      const cursor = orderCollection.find({});
      const result = await cursor.toArray();
      const myBookings = result.filter((booking) => booking.email === email);
      console.log(myBookings);
      res.json(myBookings);
    });
  } finally {
    //   await client.close()
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello the server is running');
});

app.listen(port, () => {
  console.log('listening to the port', port);
});
