const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
var isLoggedIn = false;
// mongoose.connect("mongodb://localhost:27017/studetdetails");

//db connection
mongoose.connect(
  "mongodb+srv://Priyadharshini_S:priya0706@cluster0.aowxe.mongodb.net/StudentManagement?retryWrites=true&w=majority"
);
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

app.use(bodyParser.urlencoded({ extended: true }));

//routing
app.get("", (req, res) => {
  res.sendFile(__dirname + "/templates/home.html");
});

app.get("/insert", (req, res) => {
  if (isLoggedIn) {
    res.sendFile(__dirname + "/templates/insert.html");
  } else {
    res.redirect("/login");
  }
});
app.get("/update", (req, res) => {
  if (isLoggedIn) {
    res.sendFile(__dirname + "/templates/update.html");
  } else {
    res.redirect("/login");
  }
});
app.get("/delete", (req, res) => {
  if (isLoggedIn) {
    res.sendFile(__dirname + "/templates/delete.html");
  } else {
    res.redirect("/login");
  }
});

app.get("/read", (req, res) => {
  res.sendFile(__dirname + "/templates/read.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/templates/login.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/templates/register.html");
});
app.get("/manage_details", (req, res) => {
  res.sendFile(__dirname + "/templates/manage_details.html");
});

// functions

//register
app.post("/register", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var data = {
    name: name,
    email: email,
    password: password,
  };
  db.collection("users").insertOne(data, function (err, collection) {
    if (err) throw err;
  });

  res.redirect("/login");
});

//login
app.post("/login", function (req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var data = {
    name: name,
  };
  var query = { name: data.name };
  db.collection("users").findOne(query, function (err, result) {
    if (err) res.send(err);
    resl = result;
    console.log(password, resl);
    if (resl == null) {
      res.status(409).send("User not Exist");
      return;
    } else {
      if (password == resl.password) {
        isLoggedIn = true;
        res.redirect("/manage_details");
      } else {
        res.status(409).send("password incorrect");
      }
    }
  });
});

//read
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
    if (resl == null) {
      res.status(409).send("User not Exist");
      return;
    } else {
      res.send(
        `<html>
        <style>
        body {background-image:linear-gradient(to right,rgb(243, 46, 96),rgb(145, 46, 175),rgb(241, 98, 98))  ;
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;}
        @keyframes gradient {0% {background-position: 0% 50%;}50% {background-position: 100% 50%;}100% {background-position: 0% 50%;}} 
        .forms{ margin-top:200px;border-radius:20px;border: 3px solid black;margin-left: 570px;width: 25%;}
        </style><body>
        <div class='forms'>
        <center>
     
         </center>
         <table>
         <tr>
         <td> Name <td>
         <td> Rollnumber <td>
         <td> Department <td>
         <td> Section <td>
         </tr>
         <tr>
         <td>${resl.name}</td>
         <td>${resl.rollnumber}</td>
         <td>${resl.dept}</td>
         <td>${resl.sec}</td>
         </tr>
         </table>
         </div>
         </body>
         </html>`
      );
    }
  });
});

app.listen(3001, (res) => {
  console.log("server started at port 3001");
});

//insert
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

//update
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

//delete
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
