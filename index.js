const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zhghr.mongodb.net/volunteerNetwork?retryWrites=true&w=majority`;
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(err => {
  const userCollection = client.db("volunteerNetwork").collection("users");
  const tasksCollection = client.db("volunteerNetwork").collection("Tasks");
  const eventsCollection = client.db("volunteerNetwork").collection("Events");
  app.post("/addUser", (req, res) => {
    const Product = req.body;
    userCollection.insertOne(Product)
      .then(result => {
        console.log("data added Successfully");

      })
  })
  app.get('/users', (req, res) => {
    console.log(req.query.email)
    userCollection.find({
        email: req.query.email
      })
      .toArray((err, documents) => {
        res.send(documents)
      })

  })
  app.get
  app.delete('/delete/:id', (req, res) => {
    userCollection.deleteOne({
        _id: ObjectId(req.params.id)
      })
      .then(result =>
        res.send(result.deletedCount > 0)
      )
  })
  app.get('/allUsers', (req, res) => {
    userCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
    app.delete('/deleteUser/:id', (req, res) => {
      userCollection.deleteOne({
          _id: ObjectId(req.params.id)
        })
        .then(result =>
          console.log(result)
        )
    })

  })

  app.post("/addTasks", (req, res) => {
    const Product = req.body;
    tasksCollection.insertOne(Product)
      .then(result => {
        console.log("data added Successfully");

      })
  })
  app.post("/addEvent", (req, res) => {
    const Product = req.body;
    eventsCollection.insertOne(Product)
      .then(result => {
        console.log("data added Successfully");

      })
  })
  app.get('/events', (req, res) => {
    eventsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  app.get('/tasks', (req, res) => {
    tasksCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  app.get('/', (req, res) => {

    res.send('welcome to new database')

  })
});


app.listen(process.env.PORT || port);