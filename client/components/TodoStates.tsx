import React, { Component } from "react";
import { CheckCircleIcon, StopIcon, TrashIcon } from "@primer/octicons-react";
import Form from "./App";
import {todo} from './iTodo'

type todoAProps={ 
    todo: todo ,
    completeHandler: (todoId:string) => void
    removeHandler: (todoId:string) => void
    importantHandler:(todoId: string)=> void
    
}


class todoStates extends Component <todoAProps, any> {
    constructor(props: todoAProps) {
        super(props);
         this.state = { 
            //  isComplete: this.props.complete 
            };
    }

    render() {
        return (
            <div draggable = {true}
                className="todos"
                style={{
                    backgroundColor: this.props.todo.important
                        ? "firebrick"
                        : "",
                }}
            >
        
                {this.props.todo.text}
                
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
