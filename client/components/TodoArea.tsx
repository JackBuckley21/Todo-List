import React, { Component } from "react";
import TodoStates from "./TodoStates";
import {todo} from './iTodo'

type todoAProps={ 
    todos: todo []
    completeHandler: (todoId:string) => void,
    removeHandler :(todoId:string) => void,
    importantHandler:(todoId:string) => void,
    hideComplete: boolean,
}

class TodoArea extends Component <todoAProps,any> {
    constructor(props: todoAProps) {
        super(props);
        this.state = {};
    }

    drawTodo(todo: todo):JSX.Element{
       return <TodoStates
                key={todo._id}
                todo={todo}
                completeHandler={(todoId:string) => {
                    this.props.completeHandler(todoId);
                }}
                 removeHandler={(todoId:string) => {
                    this.props.removeHandler(todoId);                
                 }}                         
                importantHandler={(todoId:string) => {
                    this.props.importantHandler(todoId);
                 }}
            />

    }


    // Renders todo List items //
    render() {
        let todos = [];
        let importantTodos = [];
        for (const todo of this.props.todos) {
            if (!(this.props.hideComplete && todo.isComplete)) {
                if(todo.important){
                importantTodos.push(
                    this.drawTodo(todo)
                );
                    }else{
                        todos.push(
                            this.drawTodo(todo)
                        );
                    }
            
                }
        }

        //todoStates
    return <React.Fragment><div className="Todo-List">{importantTodos}</div><div>{todos}</div></React.Fragment>;
    }
}


export default TodoArea;

