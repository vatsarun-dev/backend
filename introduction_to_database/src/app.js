const express = require("express");
const userModel = require("./models/user.schema.js");
// creating instance of express

const app = express();

// creating middleware for json

app.use(express.json());

// creating REST API
app.post("/user", async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body;
    let newUser = await userModel.create({
      name,
      email,
      mobile,
      password,
    });

    // this filed is for validation

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    console.log(newUser);
    return res.status(201).json({
      message: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// GET API

app.get("/user-get", async (req, res) => {
  let user = await userModel.find();

  return res.status(200).json({
    message: "user get successfully",
    user,
  });
});

// PUT API

app.put("/user/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, email, mobile, password } = req.body;
    let updateUser = await userModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobile,
        password,
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "user updated successfully",
      updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// DELETE API

app.delete("/user-delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "user delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});
module.exports = app;
