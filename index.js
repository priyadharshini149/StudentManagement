const express = require("express");
const Student = require("./models/Details");
const userDetails = require("./models/user");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
var isLoggedIn = false;

const AdminRoute = require("./routes/admin");
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
const studetails = require("./models/Details");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", AdminRoute);

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
app.post("/register", async function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  try {
    var user = userDetails(name, email, password);
    await user.save();

    res.redirect("/login");
  } catch (err) {
    res.status(400).send("registration failed");
  }
});

//login
app.post("/login", async function (req, res) {
  var name = req.body.name;
  var password = req.body.password;
  console.log(name, password);
  var user = await userDetails.findOne({
    name: name,
    // password: password,
  });
  console.log(user);
  if (user) {
    isLoggedIn = true;
    res.redirect("/manage_details");
  } else {
    res.status(409).send("password incorrect");
  }
});

//read
app.post("/read", async function (req, res) {
  var name = req.body.name;
  var resl;

  var data = {
    name: name,
  };
  var myquery = { name: data.name };

  const stud = await Student.findOne(myquery);
  console.log(stud);

  res.send(
    `<html>
            <style>
            body {background-image:linear-gradient(to right,rgb(243, 46, 96),rgb(145, 46, 175),rgb(241, 98, 98))  ;
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;}
            @keyframes gradient {0% {background-position: 0% 50%;}50% {background-position: 100% 50%;}100% {background-position: 0% 50%;}}
            button{ width:25%;border-radius:10px;padding:7px;}
            .details{background-color: #333;color:white; width:35%;margin-top:200px;padding:30px; font-size:20px}
            </style><body>
           
            <center>
            <div class="details">
            <p>Name: ${stud.name}</p>
            <p>Roll number: ${stud.rollnumber} </p>
            <p>Department: ${stud.department} </p>
            <p>Section: ${stud.section}</p>
            <button onclick="window.history.go(-1); return false;">back</button>
            </div>    
            </center>
            
            
             </body>
             </html>`
  );
});

app.listen(3001, (res) => {
  console.log("server started at port 3001");
});
