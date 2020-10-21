import React, { Component } from "react";
import { CheckCircleIcon, TrashIcon } from "@primer/octicons-react";

class todoStates extends Component {
  constructor(props) {
    super(props);
    this.state = { isComplete: this.props.complete };
  }

  render() {
    return (
      <div>
        {this.props.todo.text}
        <button
          style={{
            color: this.props.todo.isComplete ? "lime" : "",
          }}
          className="completed-handler-btn right"
          onClick={() => this.props.completeHandler(this.props.todo._id)}
          // defaultChecked={this.props.todo.isComplete}
        >
          <CheckCircleIcon size={18} />
        </button>
        <button
          className="button remove-handler-btn right"
          onClick={() => this.props.removeHandler(this.props.todo._id)}
        >
          <TrashIcon size={20} />
        </button>
      </div>
    );
  }
}

export default todoStates;
