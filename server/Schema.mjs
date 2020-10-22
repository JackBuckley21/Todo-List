import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema({
    text: String,
    important: Boolean,
    isComplete: Boolean,
});

const todos = mongoose.model("todos", todoSchema);

export default todos;
