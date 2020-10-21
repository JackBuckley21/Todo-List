import React, { Component } from "react";
import TodoArea from "./TodoArea.js";
import axios from "axios";
import {
    EyeClosedIcon,
    PlusCircleIcon,
    TasklistIcon,
    XCircleIcon,
} from "@primer/octicons-react";
const baseUrl = "api/";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            hideComplete: false,
            newTodo: "",
        };

        this.getTodos();
    }

    //Handles the change state of the input box//

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    getTodos() {
        axios.get("api/todos").then((res) => {
            console.log(res.data);
            this.setState({ todos: res.data });
        });
    }

    addTodo(event) {
        event.preventDefault();

        const { todos, newTodo, nextId } = this.state;

        if (!this.state.newTodo.trim()) {
            alert("Please enter a valid todo item!");
        } else {
            axios
                .post("api/todos/new-todo", { text: this.state.newTodo })
                .then((res) => {
                    console.log(res.data);

                    this.setState({ todos: res.data, newTodo: "" });
                })
                .catch((err) => console.log(err));
        }
    }

    removeAll(event) {
        event.preventDefault();
        axios
            .delete(baseUrl + "/todos/delete-all")
            .then((res) => {
                this.setState({
                    todos: [],
                });
            })
            .catch((err) => console.log(err));
    }

    removeTodo(todoId) {
        axios
            .delete(baseUrl + "/todos/delete/" + todoId)
            .then((res) => {
                console.log(res);
                console.log(this.state.todos);
                let remove = this.state.todos.filter(
                    (todo) => todo._id != todoId
                );
                console.log(remove);

                this.setState({
                    todos: remove,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    clearCompleteTodos(event) {
        event.preventDefault();

        axios
            .delete(baseUrl + "/todos/clear-complete-todos")
            .then((res) => {
                console.log(res.data);

                let clear = this.state.todos.filter((todo) => !todo.isComplete);

                this.setState({ todos: clear });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    isComplete(todoId) {
        axios
            .put(baseUrl + "/todos/is-complete/" + todoId)
            .then((res) => {
                console.log(res);
                let todoComplete = this.state.todos.map((todo) => {
                    if (todo._id == todoId) {
                        todo.isComplete = !todo.isComplete;
                    }
                    console.log(todoComplete);
                    return todo;
                });

                this.setState({
                    todos: todoComplete,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    showHideCompletedTodos(event) {
        event.preventDefault();
        this.state.hideComplete = !this.state.hideComplete;

        this.setState({
            todos: this.state.todos,
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Todo App</h1>
                <section className="todo-form">
                    <form>
                        <input
                            className="newTodoInput"
                            id="new_todo_input"
                            type="text"
                            name="newTodo"
                            onChange={(event) => this.handleChange(event)}
                            value={this.state.newTodo}
                            placeholder="Something that needs doing"
                        />

                        <button
                            style={{
                                display: this.state.newTodo ? "" : "none",
                            }}
                            className="base-btn"
                            onClick={(event) => this.addTodo(event)}
                            id="new_todo_submit"
                        >
                            <PlusCircleIcon size={20} />
                        </button>
                        <div className="Remove-func">
                            <label>
                                <button
                                    className=" button show-hide-btn left"
                                    onClick={(event) =>
                                        this.showHideCompletedTodos(event)
                                    }
                                >
                                    Show/Hide Completed Todos{" "}
                                    <EyeClosedIcon size={20} />
                                </button>
                            </label>
                            <button
                                className="button clearCompleted-btn center"
                                onClick={(event) =>
                                    this.clearCompleteTodos(event)
                                }
                            >
                                Remove Completed Todos{" "}
                                <TasklistIcon size={20} />
                            </button>
                            <button
                                className="button remove-all-btn right-top"
                                onClick={(event) => this.removeAll(event)}
                                id="remove_all"
                            >
                                Remove All Todos <XCircleIcon size={20} />
                            </button>
                        </div>
                    </form>
                    <div className="todo-area">
                        <TodoArea
                            todos={this.state.todos}
                            completeHandler={(event) => this.isComplete(event)}
                            removeHandler={(event) => this.removeTodo(event)}
                            hideComplete={this.state.hideComplete}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default Form;
