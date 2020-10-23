import React, { Component, MouseEventHandler } from "react";
import TodoArea from "./TodoArea";
import ImportantArea from "./TodoArea";
import axios from "axios";
import {
    EyeClosedIcon,
    EyeIcon,
    PlusCircleIcon,
    TasklistIcon,
    XCircleIcon,
} from "@primer/octicons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {todo} from "./iTodo"

const baseUrl = "api/";


type AState={
    todos: todo[]
    hideComplete: boolean
    newTodo: string
    editTodo:string
}

class Form extends Component <{}, AState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            todos: [],
            hideComplete: false,
            newTodo: "",
            editTodo: "",
        };

        this.getTodos();
    }

    // Handles Button Text and Icon Change
    changeEye(hide: boolean) {
        if (hide) {
            return (
                <div>
                    Show Completed Todos {""}
                    <EyeIcon size={20} />
                </div>
            );
        }
        return (
            <div>
                Hide Complete Todos {""}
                <EyeClosedIcon size={20}  />
            </div>
        );
    }

    //Handles the change state of the input box//
    handleChange(event: any,) {
        this.setState({...this.state, [event.target.name]: event.target.value });
    }

    getTodos() {
        axios.get("api/todos").then((res) => {
            console.log(res.data);
            this.setState({ todos: res.data });
        });
    }

    addTodo(event:React.MouseEvent<HTMLElement>) {
        event.preventDefault();



        if (!this.state.newTodo.trim()) {
            // alert("Please enter a valid todo item!");
            toast.error("Please enter a valid todo item!");
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

    todoEdit(event:React.MouseEvent<HTMLElement>, todoId:String) {
        event.preventDefault();
        if (!this.state.editTodo.trim()) {
            alert("Please enter valid characters");
        } else {
            axios
                .post(baseUrl + "/todos/update-todo/" + todoId, {
                    // text: this.state.todos.editTodo,
                })
                .then((res) => {
                    let editTodo = this.state.todos.map((todo:any) => {
                        if (todo._id == todoId) {
                            todo.text == todo.editTodo;
                        }
                        return todo;
                    });
                    this.setState({
                        todos: editTodo,
                    });
                })
                .catch((err) => console.log(err));
        }
    }

    removeAll(event:React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        axios
            .delete(baseUrl + "/todos/delete-all")
            .then((res) => {
                this.setState({
                    todos: [],
                });
                toast.dark("All todos removed");
            })
            .catch((err) => console.log(err));
    }

    removeTodo(todoId:String) {
        axios
            .delete(baseUrl + "/todos/delete/" + todoId)
            .then((res) => {
                console.log(res);
                let remove = this.state.todos.filter(
                    (todo) => todo._id != todoId
                );
                console.log(remove);

                this.setState({
                    todos: remove,
                });
                toast.dark("Todo Removed");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to remove todo");
            });
    }

    clearCompleteTodos(event:React.MouseEvent<HTMLElement>) {
        event.preventDefault();

        axios
            .delete(baseUrl + "/todos/clear-complete-todos")
            .then((res) => {
                console.log(res.data);

                let clear = this.state.todos.filter((todo:any) => !todo.isComplete);

                this.setState({ todos: clear });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    isComplete(todoId:String) {
        axios
            .put(baseUrl + "/todos/is-complete/" + todoId)
            .then((res) => {
                console.log(res);
                let todoComplete = this.state.todos.map((todo:any) => {
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
                toast.error("Failed to mark as complete");
            });
    }
    isImportant(todoId:String) {
        axios
            .put(baseUrl + "/todos/is-important/" + todoId)
            .then((res) => {
                console.log(res);
                let todoImportant = this.state.todos.map((todo:any) => {
                    if (todo._id == todoId) {
                        todo.important = !todo.important;
                    }
                    console.log(todoImportant);
                    return todo;
                });

                this.setState({
                    todos: todoImportant,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    showHideCompletedTodos(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.setState({hideComplete : !this.state.hideComplete});

    }

    render() {
        
        return (
            <div className="container">
                <h1>Todo App</h1>
                <section className="todo-form">
                    <form>
                        <ToastContainer/>
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
                            onClick={(event:any) => this.addTodo(event)}
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
                                    {this.changeEye(this.state.hideComplete)}
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
                    <div>
                    
                    </div>
                    <div className="todo-area">
                        <TodoArea
                            todos={this.state.todos}
                            completeHandler={(event) => this.isComplete(event)}
                            removeHandler={(event) => this.removeTodo(event)}
                            importantHandler={(event) => this.isImportant(event)
                            }
                            hideComplete={this.state.hideComplete}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default Form;
