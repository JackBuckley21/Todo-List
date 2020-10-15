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
        for (const [id, todo] of this.props.todos.entries()) {
            if (!(this.props.hideComplete && todo.isComplete)) {
                todos.push(
                    <TodoStates
                        key={id}
                        todoId={id}
                        todo={todo}
                        completeHandler={(todoId) => {
                            this.props.completeHandler(todoId);
                        }}
                        removeHandler={(todoId) => {
                            this.props.removeHandler(todoId);
                        }}
                    />
                );
            }
        }

        //todoStates
        return <div>{todos}</div>;
    }
}

export default TodoArea;

// (!(1&& 2) || 3)