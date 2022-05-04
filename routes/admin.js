const router = require("express").Router();
const Student = require("../models/Details");

//insert
router.post("/insert", async function (req, res) {
  var name = req.body.name;
  var rollnumber = req.body.rollnumber;
  var dept = req.body.dept;
  var sec = req.body.sec;

  var data = {
    name: name,
    rollnumber: rollnumber,
    department: dept,
    section: sec,
  };

  const stud = await Student.create(data);
  console.log(stud);

  res.send(
    "<html><style>body {background-image:linear-gradient(to right,rgb(243, 46, 96),rgb(145, 46, 175),rgb(241, 98, 98))  ;background-size: 400% 400%;animation: gradient 15s ease infinite;}@keyframes gradient {0% {background-position: 0% 50%;}50% {background-position: 100% 50%;}100% {background-position: 0% 50%;}} .forms{ margin-top:200px;border-radius:20px;border: 3px solid black;margin-left: 570px;width: 25%;}</style><body><div class='forms'><center><h1 >successfully inserted</h1></center></div></body></html"
  );
});

//update
router.post("/update", async function (req, res) {
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

  const stud = await Student.updateOne(myquery, newvalues);
  console.log(stud);

  res.send(
    "<html><style>body {background-image:linear-gradient(to right,rgb(243, 46, 96),rgb(145, 46, 175),rgb(241, 98, 98))  ;background-size: 400% 400%;animation: gradient 15s ease infinite;}@keyframes gradient {0% {background-position: 0% 50%;}50% {background-position: 100% 50%;}100% {background-position: 0% 50%;}} .forms{ margin-top:200px;border-radius:20px;border: 3px solid black;margin-left: 570px;width: 25%;}</style><body><div class='forms'><center><h1 >successfully updated </h1></center></div></body></html"
  );
});

//delete
router.post("/delete", async function (req, res) {
  var name = req.body.name;
  var data = {
    name: name,
  };
  var myquery = { name: data.name };

  const stud = await Student.deleteOne(myquery);
  console.log(stud);

  res.send(
    "<html><style>body {background-image:linear-gradient(to right,rgb(243, 46, 96),rgb(145, 46, 175),rgb(241, 98, 98))  ;background-size: 400% 400%;animation: gradient 15s ease infinite;}@keyframes gradient {0% {background-position: 0% 50%;}50% {background-position: 100% 50%;}100% {background-position: 0% 50%;}} .forms{ margin-top:200px;border-radius:20px;border: 3px solid black;margin-left: 570px;width: 25%;}</style><body><div class='forms'><center><h1 >successfully deleted</h1></center></div></body></html"
  );
});

module.exports = router;
