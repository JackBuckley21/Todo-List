import React, { Component } from "react";
import TodoStates from "./TodoStates";

class TodoArea extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Renders todo List items //
    render() {
        let todos = [];
        for (const todo of this.props.todos) {
            if (!(this.props.hideComplete && todo.isComplete)) {
                todos.push(
                    <TodoStates
                        key={todo._id}
                        todo={todo}
                        completeHandler={(todoId) => {
                            this.props.completeHandler(todoId);
                        }}
                        removeHandler={(todoId) => {
                            this.props.removeHandler(todoId);
                        }}
                        importantHandler={(todoId) => {
                            this.props.importantHandler(todoId);
                        }}
                        editTodoHandler={(todoId) => {
                            this.props.editTodoHandler(todoId);
                        }}
                    />
                );
            }
        }

        //todoStates
        return <div className="Todo-List">{todos}</div>;
    }
}

export default TodoArea;
