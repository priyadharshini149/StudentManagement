const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollnumber: String,
  department: String,
  section: String,
});

const Student = mongoose.model("details", studentSchema);
module.exports = Student;
