const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

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
    const Servicecollection = client.db('BookAndTravel').collection('services');
    const Ordercollection = client.db('BookAndTravel').collection('orders');

    app.post('/addService', async (req, res) => {
      const newService = req.body;

      const result = await Servicecollection.insertOne(newService);
      console.log(result);
      res.json(result);

      //     const result = await haiku.insertOne(doc);
      // console.log(`A document was inserted with the _id: ${result.insertedId}`);
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
