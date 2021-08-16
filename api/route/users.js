//Import validiton functions to chevk the validite of the request values
const validitionRegister = require('../validation/registerValidation');
const validitionLogin = require('../validation/loginValidation');
const validitionUserSell = require('../validation/User‏‏SellItemValidation');
const validitionUserbuy = require('../validation/‏‏UserbuyValidation');

let express = require("express");
let router = express.Router();

let users;

//Connect to mongodb database the web .
const MongoClient = require('mongodb').MongoClient; 
const uri = "mongodb+srv://jfy:Aa1234bB@cluster0.dkij5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if (err) return console.error(err);
  users = client.db("justForYou").collection("users");
});

//Function that implements the GET request to get all the users.
router.get("/", function (req, res) {
  users.find().toArray()
    .then((Users) => {
      res.send(Users);
    })
    .catch((err) => res.send(err));
});

//Function that implements the GET request to get one of the users according to his id. 
router.get("/:id", function (req, res) {
  let Id = req.params.id;
  users.findOne({ id: Number(Id) })
    .then((user) => {
      if (user === null) {
        return res.end("not found");
      }
      res.send(user);
    })
    .catch((err) => res.send(err));
});

//Function that implements the post request to save new user that registred to the web  
router.post("/", function (req, res) {
  let user = req.body 
  let newErrors = validitionRegister.valuesErrors(user);
  let valid = Object.keys(newErrors).length === 0;
  if (!valid) {
    return res.end("not valid");
  }
  users.find({ email: user.email }).toArray()
    .then((Users) => {
      if (Users.length != 0) {
        return res.send("the email not valid");
      } else {
        users.insertOne(user)
          .then(() => {
            return res.send("=))");
          })
          .catch((err) => {
            return res.end(err)
          });
      }
    })
    .catch((err) => res.send(err));
});

//Function that implements the PUT request to update exist user by the new values that sent    
router.put("/:id", function (req, res) {
  const userInfo = req.body;
  let newErrors = validitionLogin.valuesErrors(userInfo);
  let valid = Object.keys(newErrors).length === 0;
  if (!valid) {
    return res.end("not valid");
  }
  users.findOne({ email: userInfo.email, password: userInfo.password })
    .then((user) => {
      if (user === null) {
        return res.end("not exist");
      }
      userInfo.buyItems.map((item) => {
        let newErrors = validitionUserbuy.valuesErrors(item);
        valid = Object.keys(newErrors).length === 0;
        if (!valid) {
          return res.end("not valid");
        }
        for (let i = 0; i < item.offers.length; i++) {
          let newErrors = validitionUserSell.valuesErrors(item.offers[i], item);
          valid = Object.keys(newErrors).length === 0;
          if (!valid) {
            return res.send("not valid");
          }
        }
      })
      delete userInfo._id;
      users.updateOne({ email: userInfo.email }, { $set: userInfo })
        .then(() => {
          res.end("=))");
        })
        .catch((err) => {
          return res.send(err);
        });
    })
    .catch((err) => {
      return res.send(err);
    });
});


module.exports = router;
