let express = require("express");
let router = express.Router();

let colors;

//Connect to mongodb database the web .
const MongoClient = require('mongodb').MongoClient; 
const uri = "mongodb+srv://jfy:Aa1234bB@cluster0.dkij5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if (err) return console.error(err);
    colors = client.db("justForYou").collection("colors");
});

//Function that implements the GET request to get the colors list from the database.
router.get("/", function (req, res) {
    colors.find().toArray()
        .then((colors) => {
            res.send(colors[0].colors);
        })
        .catch((err) => console.log(err));
});

module.exports = router;