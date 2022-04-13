const express = require("express");
let alert = require("alert");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/studetdetails");
mongoose.connect(
  "mongodb+srv://Priyadharshini_S:priya0706@cluster0.aowxe.mongodb.net/StudentManagement?retryWrites=true&w=majority"
);
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.get("", (req, res) => {
  res.sendFile(__dirname + "/templates/home.html");
});

app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + "/templates/index.html");
});
app.get("/update.html", (req, res) => {
  res.sendFile(__dirname + "/templates/update.html");
});
app.get("/delete.html", (req, res) => {
  res.sendFile(__dirname + "/templates/delete.html");
});
app.get("/read.html", (req, res) => {
  res.sendFile(__dirname + "/templates/read.html");
});

app.post("/insert", function (req, res) {
  var name = req.body.name;
  var rollnumber = req.body.rollnumber;
  var dept = req.body.dept;
  var sec = req.body.sec;

  var data = {
    name: name,
    rollnumber: rollnumber,
    dept: dept,
    sec: sec,
  };
  db.collection("details").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });
  res.send(
    "<html><style>body {background-image:linear-gradient(to right,rgb(243, 46, 96),rgb(145, 46, 175),rgb(241, 98, 98))  ;background-size: 400% 400%;animation: gradient 15s ease infinite;}@keyframes gradient {0% {background-position: 0% 50%;}50% {background-position: 100% 50%;}100% {background-position: 0% 50%;}} .forms{ margin-top:200px;border-radius:20px;border: 3px solid black;margin-left: 570px;width: 25%;}</style><body><div class='forms'><center><h1 >successfully inserted</h1></center></div></body></html"
  );
});

app.post("/update", function (req, res) {
  var name = req.body.name;
  var name1 = req.body.name1;
  var rollnumber = req.body.rollnumber;

  var data = {
    name: name,
    name1: name1,
    rollnumber: rollnumber,
  };
  var myquery = { name: data.name };
  var newvalues = { $set: { name: data.name1 } };
  db.collection("details").updateOne(
    myquery,
    newvalues,
    function (err, collection) {
      if (err) throw err;
      console.log("Record updated Successfully");
    }
  );
  res.send(
    "<html><style>body {background-image:linear-gradient(to right,rgb(243, 46, 96),rgb(145, 46, 175),rgb(241, 98, 98))  ;background-size: 400% 400%;animation: gradient 15s ease infinite;}@keyframes gradient {0% {background-position: 0% 50%;}50% {background-position: 100% 50%;}100% {background-position: 0% 50%;}} .forms{ margin-top:200px;border-radius:20px;border: 3px solid black;margin-left: 570px;width: 25%;}</style><body><div class='forms'><center><h1 >successfully updated </h1></center></div></body></html"
  );
});

app.post("/delete", function (req, res) {
  var name = req.body.name;
  var data = {
    name: name,
  };
  var myquery = { name: data.name };
  db.collection("details").deleteOne(myquery, function (err, collection) {
    if (err) throw err;
    console.log("Record deleted Successfully");
  });
  res.send(
    "<html><style>body {background-image:linear-gradient(to right,rgb(243, 46, 96),rgb(145, 46, 175),rgb(241, 98, 98))  ;background-size: 400% 400%;animation: gradient 15s ease infinite;}@keyframes gradient {0% {background-position: 0% 50%;}50% {background-position: 100% 50%;}100% {background-position: 0% 50%;}} .forms{ margin-top:200px;border-radius:20px;border: 3px solid black;margin-left: 570px;width: 25%;}</style><body><div class='forms'><center><h1 >successfully deleted</h1></center></div></body></html"
  );
});
app.post("/read", function (req, res) {
  var name = req.body.name;
  var resl;

  var data = {
    name: name,
  };
  var myquery = { name: data.name };
  db.collection("details").findOne(myquery, function (err, result) {
    if (err) throw err;
    resl = result;
    console.log(resl);

    alert(
      "Name:" +
        resl.name +
        "\n\nRoll number:" +
        resl.rollnumber +
        "\n\nDepartment:" +
        resl.dept +
        "\n\nSection:" +
        resl.sec
    );
  });

  res.send(
    "<html><style>body {background-image:linear-gradient(to right,rgb(243, 46, 96),rgb(145, 46, 175),rgb(241, 98, 98))  ;background-size: 400% 400%;animation: gradient 15s ease infinite;}@keyframes gradient {0% {background-position: 0% 50%;}50% {background-position: 100% 50%;}100% {background-position: 0% 50%;}} .forms{ margin-top:200px;border-radius:20px;border: 3px solid black;margin-left: 570px;width: 25%;}</style><body><div class='forms'><center><h2 >successfully read </h2></center></div></body></html"
  );
});

app.listen(3001, (res) => {
  console.log("server started at port 3001");
});
