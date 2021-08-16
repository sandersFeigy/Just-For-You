let express = require("express");
let router = express.Router();

let categories;

//Connect to mongodb database the web .
const MongoClient = require('mongodb').MongoClient; 
const uri = "mongodb+srv://jfy:Aa1234bB@cluster0.dkij5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if (err) return console.error(err);
    categories = client.db("justForYou").collection("categories");
});

//Function that implements the GET request to get the categories list from the database.
router.get("/", function (req, res) {
    categories.find().toArray()
        .then((categories) => {
            res.send(categories[0].categories);
        })
        .catch((err) => console.log(err));
});

module.exports = router;