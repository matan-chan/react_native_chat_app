let express = require('express');
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors")
app.use(cors())

let database;
var MongoClient = require('mongodb').MongoClient;
const { json } = require('express');
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    database = db.db("chat_database");
});

app.post('/get_users_chats', async (req, res) => {
    var query = { members: { $in: [req.body.name] } };
    const result = await database.collection("chats_table").find(query).toArray();
    res.json(result);
});

app.post('/add_message', async (req, res) => {
    var ObjectId = require('mongodb').ObjectId; 
    var o_id = new ObjectId(req.body.id); 
    await database.collection("chats_table").updateMany( { _id: o_id }, { $push: { messages: req.body.message, times:req.body.time, senders:req.body.sender }});
    res.end()
});

app.listen(8080, () => {
    console.log("App Started on PORT 8080");
});
