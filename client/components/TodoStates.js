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
                        this.props.completeHandler(this.props.todo._id)
                    }
                    id="toggle_complete"
                    type="checkbox"
                    defaultChecked={this.props.todo.isComplete}
                ></input>
                <button
                    onClick={() =>
                        this.props.removeHandler(this.props.todo._id)
                    }
                >
                    X
                </button>
            </div>
        );
    }
}

export default todoStates;
