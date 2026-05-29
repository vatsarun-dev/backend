// in this file we have to create a server
let express = require("express");

// creating a server instance

let app = express();

// using middleware for json format

app.use(express.json());

// creating an array to perform crud operation
let students = [];

// creating apis

// post api
app.post("/students", (req, res) => {
  students.push(req.body);
  return res.status(201).json({
    message: "students created successfully",
  });
});

// get api
app.get("/students/get", (req, res) => {
  return res.status(200).json({
    students,
  });
});

// patch api
app.patch("/students/update/:index", (req, res) => {
  let { index } = req.params;
  let { phone } = req.body;
  students[0][index].phone = phone;
  return res.status(201).json({
    message: "students update successfully",
  });
});

// delete api
app.delete("/students/delete/:index", (req, res) => {
  let { index } = req.params;
  students.splice(index, 1);
  return res.status(201).json({
    message: "students delete successfully",
  });
});

// we have to export the app to use in server.js

module.exports = app;
