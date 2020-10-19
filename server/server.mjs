import express from "express";
import fs from "fs";
import todos from "./Schema.mjs";

import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected");
});

const app = express();

app.use(express.json());

let serverTodos = [];

todos.find({}, function (err, docs) {
    serverTodos = docs;
    console.log(docs);
});

function rf() {
    return JSON.parse(fs.readFileSync("./server/data.json"));
}

app.get("/todos", (req, res) => {
    res.send(serverTodos);
});

app.post("/todos/new-todo", function (req, res) {
    let newTodo = req.body.text;
    let newTodos = new todos({ text: newTodo, isComplete: false });
    newTodos.save();
    serverTodos.push(newTodos);
    res.send(serverTodos);
});

app.delete("/todos/delete/:id", function (req, res) {
    console.log(req.params.id);

    todos.findByIdAndRemove(
        req.params.id,
        { useFindAndModify: false },
        (err) => {
            console.log(err);
        }
    );

    serverTodos = serverTodos.filter((todo) => todo._id != req.params.id);

    res.send(true);
});

app.delete("/todos/delete-all", function (req, res) {
    serverTodos = [];
    todos.deleteMany({}, (err) => {
        console.log(err);
    });
    res.send(true);
});

app.delete("/todos/clear-complete-todos", function (req, res) {
    todos.deleteMany({ isComplete: true }, (err) => {
        console.log(err);
        console.log("test");
    });

    serverTodos = serverTodos.filter((todo) => !todo.isComplete);

    res.send(true);
});

app.put("/todos/is-complete/:id", function (req, res) {
    console.log(req.params.id);

    let completeStatus;

    serverTodos = serverTodos.map((todo) => {
        if (todo._id == req.params.id) {
            todo.isComplete = !todo.isComplete;
            completeStatus = todo.isComplete;
        }

        return todo;
    });

    console.log(completeStatus);

    todos.findByIdAndUpdate(
        req.params.id,
        { isComplete: completeStatus },
        { useFindAndModify: false },
        (err) => {
            console.log(err);
        }
    );

    res.send(true);
});

app.listen(5000, () => {
    console.log("Listening to port: 5000");
});
