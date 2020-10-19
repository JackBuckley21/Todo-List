import React, { Component } from "react";
import TodoArea from "./TodoArea.js";
import axios from "axios";
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

                    this.setState({ todos: res.data });
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

    showHideCompletedTodos() {
        this.state.hideComplete = !this.state.hideComplete;

        this.setState({
            todos: this.state.todos,
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Todo App</h1>
                <section>
                    <form>
                        <input
                            id="new_todo_input"
                            type="text"
                            name="newTodo"
                            onChange={this.handleChange.bind(this)}
                            value={this.state.newTodo}
                            placeholder="Something that needs doing"
                        />
                        <button
                            onClick={this.addTodo.bind(this)}
                            id="new_todo_submit"
                        >
                            Add Todo
                        </button>
                        <label>
                            Show / Hide Completed Todos
                            <input
                                onClick={this.showHideCompletedTodos.bind(this)}
                                id="toggle_complete"
                                type="checkbox"
                            />
                        </label>
                        <button onClick={this.clearCompleteTodos.bind(this)}>
                            Remove Completed Todos
                        </button>
                        <button
                            onClick={this.removeAll.bind(this)}
                            id="remove_all"
                        >
                            Remove All Todos
                        </button>
                    </form>

                    <TodoArea
                        todos={this.state.todos}
                        completeHandler={this.isComplete.bind(this)}
                        removeHandler={this.removeTodo.bind(this)}
                        hideComplete={this.state.hideComplete}
                    />
                </section>
            </div>
        );
    }
}

export default Form;
