//Create a new server.
let express = require("express");
let app = express();

//Let the client app connect to the server.
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

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

let connectSuccess = false;
//Connect to mongodb database the web .
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jfy:Aa1234bB@cluster0.dkij5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if (err) return console.error(err);
  requests = client.db("justForYou").collection("request");
  forSell = client.db("justForYou").collection("forSell");
  users = client.db("justForYou").collection("users");
  connectSuccess = true;
  console.log("=)")
});

let port = 27017;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

//Route the requests to the approprite server page.
app.use("/users", require("./route/users"));
app.use("/categories", require("./route/categories"));
app.use("/forSell", require("./route/forSell"));
app.use("/request", require("./route/request"));
app.use("/colors", require("./route/colors"));


//Timer that every secend make the function myTimer run again.
setInterval(myTimer,   86400000 ); //once a day

//Function that over the requests and check if they end.
async function myTimer() {
  if (connectSuccess) {
    var Id = 0
    requests.find().toArray()
      .then((Requests) => {
        let date = new Date();
        let thisDate = formatDate(date);
        var i
        for (i = 0; i < Requests.length; i++) {
          let temp = Requests[i]
          if (temp.endDay <= thisDate && ((!temp.finish) || temp.close <= thisDate)) {
            if (!temp.finish) {
              users.findOne({ id: temp.userId })
                .then((tempUser) => {
                  let mailOptions = {
                    from: "justForYouIsreal@gmail.com",
                    to: tempUser.email,
                    subject: "הבקשה שלך נסגרה!",
                    html:
                      '<p>&nbsp;</p>\
                    <p style="text-align: right;">&nbsp;<span style="font-size: 18pt;">&nbsp;היי '+ tempUser.name + '</span></p>\
                    <p style="padding-left: 40px; text-align: right;"><span style="font-size: 18pt;"><span style="font-size: 14pt;">&nbsp;בקשת&nbsp;</span><span style="font-size: 18.6667px;">הפריט&nbsp;</span><span style="font-size: 14pt;">'+ temp.name + '&nbsp;</span></span><span style="font-size: 18.6667px;">שפרסמת נסגרה היום !</span></p>\
                    <p style="padding-left: 40px; text-align: right;"><em>&nbsp;</em>היכנס/י לאתר כדאי לצפות בכל הצעות המכירה שהתקבלו עד כה ולבחור אחת&nbsp; מהן.</p>\
                    <p style="padding-left: 40px; text-align: right;">&nbsp;באם לא תעשה זאת תוך שבוע הבקשה תסגר וכל הפריטים שהוצעו לך יועברו לפריטים למכירה כך שכל משתמש באתר יוכל לקנות אותם ולכן על מנת לשמור על .קדימותך בחר פריט בתוך שבוע זה</p>\
                    <p style="padding-left: 40px; text-align: right;">בהצלחה!</p>\
                    <p>&nbsp;</p>\
                    <p style="text-align: right;">תמיד לשרותך</p>\
                    <p style="text-align: right;">&nbsp;שרות לקוחות&nbsp; just for you</p>' ,
                  };
                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                    }
                    else {
                      console.log("Email sent: " + info.response);
                    }
                  });
                  console.log("temp id: " + temp.id)
                  requests.updateOne({ id: temp.id }, { $set: { finish: true, emailType: "סגור" } })
                    .then(() => {
                      console.log("=)) " + temp.id);
                    })
                    .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
            }
            else if (temp.close <= thisDate) {
              forSell.find().toArray()
                .then((ff) => {
                  let temp2 = temp.offers;
                  let name = temp.name;
                  let id = (ff.length === 0) ? 1 : (Number(ff[ff.length - 1].id) + 1);
                  id = (Id > 0) ? Id : id
                  let array = [];
                  var j;
                  for (j = 0; j < temp2.length; j++) {
                    let item = temp2[j];
                    let sellItem = {
                      id: id,
                      name: name,
                      sellerId: item.sellerId,
                      category: item.category,
                      color: item.color,
                      sellerItemId: item.id,
                      companyName: item.companyName,
                      madeDate: item.madeDate,
                      model: item.model,
                      otherThings: item.otherThings,
                      price: item.price,
                      src: item.src,
                    }
                    id = id + 1;
                    array.push(sellItem); 
                  }
                  Id = id;
                  let tempuser
                  if (array.length === 0) {
                    users.findOne({ id: temp.userId })
                      .then((tempUser) => {
                        tempuser = tempUser 
                        var k
                        for (k = 0; k < tempuser.buyItems.length; k++) {
                          if (tempuser.buyItems[k].id === temp.userItemsId) {
                            tempuser.buyItems.splice(k, 1); 
                            users.updateOne({ id: temp.userId }, { $set: tempuser })
                              .then(() => {
                                console.log("user change");
                                requests.deleteOne({ id: temp.id })
                                  .then(() => {
                                    console.log("buy del");
                                  })
                                  .catch((err) => console.log(err))
                              })
                              .catch((err) => console.log(err))
                            break
                          }
                        }
                      })
                      .catch((err) => console.log(err))
                  } else {
                    forSell.insertMany(array)
                      .then(() => {
                        users.findOne({ id: temp.userId })
                          .then((tempUser) => {
                            tempuser = tempUser 
                            var k
                            for (k = 0; k < tempuser.buyItems.length; k++) {
                              if (tempuser.buyItems[k].id === temp.userItemsId) { 
                                tempuser.buyItems.splice(k, 1);
                                users.updateOne({ id: temp.userId }, { $set: tempuser })
                                  .then(() => { 
                                    requests.deleteOne({ id: temp.id })
                                      .then(() => {
                                        console.log("buy del");
                                      })
                                      .catch((err) => console.log(err))
                                  })
                                  .catch((err) => console.log(err))

                                break
                              }
                            }
                          })
                          .catch((err) => console.log(err))
                      })
                      .catch((err) => console.log(err))
                  }
                })
                .catch((err) => console.log(err))
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}


//Function to return 404 error if the path is not recognized in this server.
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

//Start runing the server in the given port.
app.listen(port, function () { });
