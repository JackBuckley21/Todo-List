import express from "express";
import fs from "fs";

import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected");
});

const app = express();

app.use(express.json());

function rf() {
    return JSON.parse(fs.readFileSync("./server/data.json"));
}

app.get("/todos", (req, res) => {
    res.send(rf());
});

app.post("/todos/new-todo", function (req, res) {
    console.log(req.body.text);
    const newId = +new Date();
    let serverData = new Map(rf());
    let newTodo = req.body.text;
    serverData.set(newId, {
        text: newTodo,
        isComplete: false,
    });

    fs.writeFileSync("./server/data.json", JSON.stringify([...serverData]));
    console.log(serverData);
    res.send(JSON.stringify(newId));
});

app.delete("/todos/delete/:id", function (req, res) {
    const todoId = parseInt(req.params.id);
    try {
        let serverData = new Map(rf());
        serverData.delete(todoId);
        console.log(serverData);
        fs.writeFileSync("./server/data.json", JSON.stringify([...serverData]));
    } catch {}

    res.send(true);
});

app.delete("/todos/delete-all", function (req, res) {
    try {
        let serverData = new Map(rf());
        serverData.clear();
        console.log(serverData);
        fs.writeFileSync("./server/data.json", JSON.stringify([...serverData]));
    } catch {}

    res.send(true);
});

app.delete("/todos/clear-complete-todos", function (req, res) {
    let serverData = new Map(rf());

    for (const [id, todo] of serverData.entries()) {
        if (todo.isComplete) {
            serverData.delete(id);
            fs.writeFileSync(
                "./server/data.json",
                JSON.stringify([...serverData])
            );
        } else {
            console.log("There was an issue rsemoving comepleted todos");
        }
    }
    res.send(true);
});

app.put("/todos/is-complete/:id", function (req, res) {
    const todoId = parseInt(req.params.id);
    let serverData = new Map(rf());
    const todo = serverData.get(todoId);

    let status = true;
    try {
        serverData.set(todoId, {
            text: todo.text,
            isComplete: !todo.isComplete,
        });
        fs.writeFileSync("./server/data.json", JSON.stringify([...serverData]));
    } catch (err) {
        console.log(err);
        status = false;
    }

    res.send(true);
});

app.listen(5000, () => {
    console.log("Listening to port: 5000");
});
