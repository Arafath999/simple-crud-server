const express = require("express")
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const cors = require("cors")
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;

// arafatuddin999
// 4vBx6X3jQevXsMVe


const uri = "mongodb+srv://arafatuddin999:4vBx6X3jQevXsMVe@cluster0.62rluh7.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();

    const userCollection = client.db("userDB").collection("users");
    // post single data endpoint
    app.post("/users",async (req,res) => {
        const user = req.body;
        console.log("user",user)
        const result = await userCollection.insertOne(user);
        console.log(result)
        res.send(result);

})
app.get("/users",async (req,res) => {
    const result = await userCollection.find().toArray();
    console.log(result)
    res.send(result)
  })

  app.delete("/users/:id",async (req,res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await userCollection.deleteOne(query)
    res.send(result)
  })
  // get singl data using id
  app.get("/users/:id",async (req,res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await userCollection.findOne(query)
    res.send(result)
  })
  app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const query = { _id: new ObjectId(id) };
    const options = { upsert: true};
    const userData = {
      $set: {
        name: data.name,
        email: data.email,
        password: data.password
      },
    }
    const result = await userCollection.updateOne(query, userData,options);
    res.send(result)
  })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res) => {
    res.send("crud is runing")
});

app.listen(port, () => {
    console.log(`app is runinig on port ${port}`)
})