//Import validiton functions to chevk the validite of the request values
const validitionSell = require('../validation/sellItemValidation');
let express = require("express");
let router = express.Router();

//Connect to nodemailer for sending emailks to users
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "justForYouIsreal@gmail.com",
    pass: "Aa1234Bb",
  },
});

let forSell; 
let users; 
 
//Connect to mongodb database the web .
const MongoClient = require('mongodb').MongoClient; 
const uri = "mongodb+srv://jfy:Aa1234bB@cluster0.dkij5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if (err) return console.error(err);
  forSell = client.db("justForYou").collection("forSell"); 
  users = client.db("justForYou").collection("users");
});

//Function that implements the GET request to get all the products for sale.
router.get("/", function (req, res) {
  forSell.find().toArray()
    .then((forsell) => {
      res.send(forsell);
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    });
});

//Function that implements the GET request to get one of the productes for sale according to his id.  
router.get("/:id", function (req, res) {
  let Id = req.params.id;
  forSell.findOne({ id: Number(Id) })
    .then((forsell) => {
      if (forsell === null) {
        return res.end("not found");
      }
      res.send(forsell);
    })
    .catch((err) => res.send(err));
});

//Function that implements the post request to save new product to sale that sent to the server  
router.post("/", function (req, res) {
  let forsell = req.body;
  let num = Number(forsell.sellerId);
  users.findOne({ id: num })
    .then((user) => {
      if (user === null) {
        console.log("User not found")
        return res.send("=((");
      }
      let valid = false;
      let sellerItem;
      for (let i = 0; i < user.sellItems.length; i++) {  
        if (user.sellItems[i].id == forsell.sellerItemId) {
          valid = true;
          sellerItem = user.sellItems[i]; 
          break;
        }
      } 
      if (!valid) {  
        res.send("=((");
      }
      let newErrors = validitionSell.valuesErrors(forsell, sellerItem);
      valid = Object.keys(newErrors).length === 0; 
      if (!valid) { 
        console.log(newErrors);
          res.send("not valid");
      } 
      forSell.insertOne(forsell)
        .then(() => {  
           res.end("=))");
        })
        .catch((err) => {  
           res.send(err)
        });
    }) 
});
 
//Function that implements the DELETE request to delete product for sale acoording to the id
router.delete("/:id", function (req, res) {
  let data = req.body; 
  if(data.buy){
    let mailOptions = {
      from: "justForYouIsreal@gmail.com",
      to: data.sellerEmail,
      subject: "אני מעונין לקנות את המוצר שלך!",
      html:
        '<p style="text-align: right;"> <span style="font-size: 18pt;"> ' + data.sellerName + ' היי </span></p>  \
          <p style="padding-left: 40px; text-align: right;"><span style="font-size: 18pt;"><span style="font-size: 14pt;">לבקשת&nbsp;</span><span style="font-size: 18.6667px;"> שפרסמת &nbsp;</span><span style="font-size: 14pt;">'+ " " + data.name + " " + '</span></span><span style="font-size: 18.6667px;">אני מעונין לקנות ממך את המוצר </span></p>\
            <p style="padding-left: 40px; text-align: right;"><em>&nbsp;&nbsp;</em> אצפה ליצירת קשר בקרוב לסיום שלבי הקניה על ידי קבלת אימייל חוזר ממך. לאימייל : '+ data.buyerEmail+'</p>\
            <p>&nbsp;</p>\
            <p style="text-align: right;">' + data.buyerName +'</p>\
            <p style="text-align: right;"> just for you באמצעות אתר</p>',
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
      else {
        console.log("Email sent: " + info.response);
      }
    });
  }
  forSell.findOne({ id: Number(req.params.id) })
    .then((forsell) => {
      forSell.remove(forsell)
        .then(() => {
          res.end("=))");
        })
        .catch((err) => {
          return res.send(err);
        })
    })
    .catch((err) => {
      return res.send(err);
    });
});

module.exports = router;