import React, { Component } from "react";

class todoStates extends Component {
    constructor(props) {
        super(props);
        this.state = { isComplete: this.props.complete };
    }

    render() {
        return (
            <div>
                {this.props.todo.text}
                <input
                    onClick={() =>
                        this.props.completeHandler(this.props.todoId)
                    }
                    id="toggle_complete"
                    type="checkbox"
                ></input>
                <button
                    onClick={() => this.props.removeHandler(this.props.todoId)}
                >
                    X
                </button>
            </div>
        );
    }
}

export default todoStates;
