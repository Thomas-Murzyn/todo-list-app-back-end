require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const Task = mongoose.model("Task", {
  task: String,
});

app.post("/newTask", async (req, res) => {
  try {
    console.log("/newTask");

    const newTask = new Task({ task: req.fields.task });

    const result = await newTask.save();

    res.status(200).json({ message: "New task created", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/deleteTask", async (req, res) => {
  try {
    console.log("/deleteTask");
    const taskDeleted = await Task.deleteMany({ task: req.fields.task });
    res.status(200).json({ message: "Task successfuly deleted", taskDeleted });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
