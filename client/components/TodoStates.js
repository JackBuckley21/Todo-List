import React, { Component } from "react";
import { CheckCircleIcon, StopIcon, TrashIcon } from "@primer/octicons-react";

class todoStates extends Component {
    constructor(props) {
        super(props);
        this.state = { isComplete: this.props.complete };
    }

    render() {
        return (
            <div
                className="todos"
                style={{
                    backgroundColor: this.props.todo.important
                        ? "firebrick"
                        : "",
                }}
            >
                <button
                    className="edit"
                    title="Edit Todo"
                    onClick={() =>
                        this.props.editTodoHandler(this.props.todo._id)
                    }
                >
                    {this.props.todo.text}
                </button>

                <input
                    style={{
                        display: this.props.todo.editTodo ? "" : "none",
                    }}
                ></input>

                <button
                    title="Completed"
                    style={{
                        color: this.props.todo.isComplete ? "lime" : "",
                    }}
                    className="completed-handler-btn right"
                    onClick={() =>
                        this.props.completeHandler(this.props.todo._id)
                    }
                >
                    <CheckCircleIcon size={20} />
                </button>
                <button
                    title="Remove"
                    className="button remove-handler-btn right"
                    onClick={() =>
                        this.props.removeHandler(this.props.todo._id)
                    }
                >
                    <TrashIcon size={20} />
                </button>

                <button
                    title="Important"
                    className="button important-handler-btn right"
                    onClick={() =>
                        this.props.importantHandler(this.props.todo._id)
                    }
                >
                    <StopIcon size={20} />
                </button>
            </div>
        );
    }
}

export default todoStates;
