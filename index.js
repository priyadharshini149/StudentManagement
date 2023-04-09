const express = require("express");
const Student = require("./models/Details");
const userDetails = require("./models/user");
const bodyParser = require("body-parser");
const app = express();

const mongoose = require("mongoose");
var isLoggedIn = false;

const AdminRoute = require("./routes/admin");
app.set("view engine", "ejs");

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
  var data = {
    name: name,
    email: email,
    password: password,
  };
  try {
    const user = await userDetails.create(data);
    console.log(user);
    res.redirect("/login");
  } catch (err) {
    const data = { info: "registeration failed" };
    res.render(__dirname + "/templates/warning.ejs", data);
  }
});

//login
app.post("/login", async function (req, res) {
  var name = req.body.name;
  var password = req.body.password;
  console.log(name, password);
  var user = await userDetails.findOne({
    name: name,
    password: password,
  });
  console.log(user);
  if (user) {
    isLoggedIn = true;
    res.redirect("/manage_details");
  } else {
    const data = { info: "user not found" };
    res.render(__dirname + "/templates/warning.ejs", data);
  }
});

//read
app.post("/read", async function (req, res) {
  var name = req.body.name;
  var data = {
    name: name,
  };
  var myquery = { name: data.name };

  const stud = await Student.find(myquery);
  var data = {};
  if (stud != null) {
    for (let st = 0; st < stud.length; st++) {
      data[st] = {
        name: stud[st].name,
        rollnumber: stud[st].rollnumber,
        department: stud[st].department,
        section: stud[st].section,
      };
    }

    res.render(__dirname + "/templates/details.ejs", { data: data });
  }
});

app.listen(3001, (res) => {
  console.log("server started at port 3001");
});
