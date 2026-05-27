// require the express
let express = require("express");

// create the instance of express for further usage

let app = express();

// creating a middleware for reading the json data

app.use(express.json());

// dummy data
let student = [
  {
    name: "Arun vats",
    rollno: 34,
  },
  {
    name: "Amrita chauhan",
    rollno: 20,
  },
  {
    name: "Esha saini",
    rollno: 50,
  },
  {
    name: "Jai surya dutt",
    rollno: 77,
  },
  {
    name: "kartik",
    rollno: 70,
  },
];

// we have to create a rest api

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "your data has been successfully fetched",
    student,
  });
});

// post method to give the data to backend

app.post("/student", (req, res) => {
  // if you have to console anything then it should be before from return statement because it can terminate the after statement
  console.log(req.body);
  return res.status(200).json({
    message: "ok",
  });
});

// it is the gateway of api's
let port = 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
