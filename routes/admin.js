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
  res.render(__dirname + "/response.ejs", { action: "sucessfully inserted!" });
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

  if (stud.matchedCount != 0) {
    res.render(__dirname + "/response.ejs", { action: "sucessfully updated!" });
  } else {
    res.render(__dirname + "/response.ejs", { action: "record not found!" });
  }
});

//delete
router.post("/delete", async function (req, res) {
  var rollnumber = req.body.rollnumber;
  var data = {
    rollnumber: rollnumber,
  };
  var myquery = { rollnumber: data.rollnumber };

  const stud = await Student.deleteMany(myquery);
  if (stud.deletedCount != 0) {
    res.render(__dirname + "/response.ejs", { action: "sucessfully deleted!" });
  } else {
    res.render(__dirname + "/response.ejs", { action: "record not found!" });
  }
});

module.exports = router;
