const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todomodel = require("./Model/Todo");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://lokesh1751be21:c0tvYUmgKTvBQIK9@cluster0.hfigw1l.mongodb.net/todo"
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/get", (req, res) => {
  todomodel
    .find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;

  todomodel
    .findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      const newDoneValue = !todo.done; // Toggling the 'done' field

      todomodel
        .findByIdAndUpdate(id, { $set: { done: newDoneValue } }, { new: true })
        .then((updatedTodo) => res.json(updatedTodo))
        .catch((err) =>
          res.status(500).json({ error: "Error updating todo", details: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ error: "Error finding todo", details: err })
    );
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  todomodel
    .findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  todomodel
    .create({
      task: task,
    })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});