//Import validiton functions to chevk the validite of the request values
const validitionBuy = require('../validation/buyValidation');
const validitionUserSell = require('../validation/User‏‏SellItemValidation');
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

let requests;
let forSell;
let users;

//Connect to mongodb database the web .
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jfy:Aa1234bB@cluster0.dkij5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if (err) return console.error(err);
  requests = client.db("justForYou").collection("request");
  forSell = client.db("justForYou").collection("forSell");
  users = client.db("justForYou").collection("users");
});

//Function that implements the GET request to get all the buy requests.
router.get("/", function (req, res) {
  requests.find().toArray()
    .then((requests) => {
      res.send(requests);
    })
    .catch((err) => console.log(err));
});

//Function that implements the GET request to get one of the requests according to his id.  
router.get("/:id", function (req, res) {
  let Id = req.params.id;
  requests.findOne({ id: Number(Id) })
    .then((request) => {
      if (request === null) {
        return res.end("not found");
      }
      res.send(request);
    })
    .catch((err) => res.send(err));
});

//Function that implements the post request to save new request that sent to the server 
router.post("/", function (req, res) {
  let request = req.body;
  let newErrors = validitionBuy.valuesErrors(request);
  const valid = Object.keys(newErrors).length === 0;
  if (!valid) {
    return res.end("not valid");
  }
  users.findOne({ id: request.userId })
    .then((user) => {
      if (user === null) {
        console.log(user)
        return res.send("=((");
      } else {
        requests.insertOne(request)
          .then(() => {
            return res.send("=))");
          })
          .catch((err) => {
            return res.send(err)
          });
      }
    }).catch((err) => {
      return res.send(err)
    });
});

//Function that implements the PUT request to update exist request by the new values that sent  
router.put("/:id", function (req, res) {
  const request = req.body;
  let newErrors = validitionBuy.valuesErrors(request);
  let valid = Object.keys(newErrors).length === 0;
  if (!valid) {
    return res.end("not valid");
  }
  users.findOne({ id: request.userId/* , userItemsId: request.userItemsId */ })
    .then((user) => {
      if (user === null) {
        return res.end("=((");
      }
      for (let i = 0; i < request.offers.length; i++) {
        let newErrors = validitionUserSell.valuesErrors(request.offers[i], request);
        let valid = Object.keys(newErrors).length === 0;
        if (!valid) {
          console.log(newErrors)
          return res.end("not valid");
        }
      }
      if (request.emailType === "מקבל הזמנות") {
        let mailOptions = {
          from: "justForYouIsreal@gmail.com",
          to: user.email,
          subject: "התקבלה הצעת מכירה חדשה לפריט שאתה מחפש!",
          html:
            '<p style="text-align: right;"> <span style="font-size: 18pt;">  היי' + user.name + '</span></p>  \
              <p style="padding-left: 40px; text-align: right;"><span style="font-size: 18pt;"><span style="font-size: 14pt;">לבקשת&nbsp;</span><span style="font-size: 18.6667px;">הפריט&nbsp;</span><span style="font-size: 14pt;">'+ " " + request.name + " " + '</span></span><span style="font-size: 18.6667px;">שפרסמת התקבלה הצעת מכירה חדשה!</span></p>\
                <p style="padding-left: 40px; text-align: right;"><em>&nbsp;&nbsp;</em>היכנס/י לאתר כדאי לצפות בכל הצעות המכירה שהתקבלו עד כה.</p>\
                <p>&nbsp;</p>\
                <p style="text-align: right;">תמיד לשרותך</p>\
                <p style="text-align: right;">&nbsp;שרות לקוחות&nbsp; just for you</p>',
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
      else if (request.emailType === "זמני") {
        request.emailType = "מקבל הזמנות";
      }
      delete request._id;
      requests.updateOne({ id: Number(req.params.id) }, { $set: request })
        .then(() => {
          res.end("=))");
        })
        .catch((err) => {
          res.send(err);
        });
    });
});

//Function that implements the DELETE request to delete request acoording to the id
router.delete("/:id", function (req, res) {
  let data = req.body;
  if (data !== null && data !== undefined) {
    let mailOptions = {
      from: "justForYouIsreal@gmail.com",
      to: data.sellerEmail,
      subject: "אני מעונין לקנות את המוצר שלך!",
      html:
        '<p style="text-align: right;"> <span style="font-size: 18pt;">  ' + data.sellerName + ' היי</span></p>  \
          <p style="padding-left: 40px; text-align: right;"><span style="font-size: 18pt;"><span style="font-size: 14pt;">  </span><span style="font-size: 18.6667px;"> שפרסמת &nbsp;</span><span style="font-size: 14pt;">'+ " " + data.name + " " + '</span></span><span style="font-size: 18.6667px;">אני מעונין לקנות ממך את המוצר </span></p>\
            <p style="padding-left: 40px; text-align: right;"><em>&nbsp;&nbsp;</em>אצפה ליצירת קשר בקרוב לסיום שלבי הקניה על ידי קבלת אימייל חוזר ממך. לאימייל :' + data.buyerEmail +'</p>\
            <p>&nbsp;</p>\
            <p style="text-align: right;">' + data.buyerName + '</p>\
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
  requests.findOne({ id: Number(req.params.id) })
    .then((request) => {
      requests.remove(request)
        .then(() => {
          res.end("=))");
        })
        .catch((err) => {
          res.send(err);
        })
    })
    .catch((err) => {
      res.send(err);
    });
});



module.exports = router;