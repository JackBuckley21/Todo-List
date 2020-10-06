class TodoApp {
    /**
     * @param {HTMLDivElement} todoArea
     */
    constructor(todoArea) {
        this.todoArea = todoArea;
        this.hideComplete = false;
        this.todos = new Map([
            [0, {
                text: 'Implement the addTodo method',
                isComplete: false,
            }],
            [1, {
                text: 'Implement the removeTodo method',
                isComplete: false,
            }],
            [2, {
                text: 'Implement the clearCompletedTodos method',
                isComplete: false,
            }],
            [3, {
                text: 'Implement the removeAllTodos method',
                isComplete: false,
            }],
            [4, {
                text: 'Implement the showHideCompletedTodos method',
                isComplete: false,
            }],
            [5, {
                text: 'Implement the toggleTodoCompleteStatus method',
                isComplete: false,
            }],
        ]);
    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} todoInput
     */
    addTodo(event, todoInput) {

    }

    /**
     * @param {number} todoId
     */
    removeTodo(todoId) {

    }

    /**
     * @param {Event} event
     */
    clearCompletedTodos(event) {

    }

    /**
     * @param {Event} event
     */
    removeAllTodos(event) {

    }

    /**
     * @param {Event} event
     * @param {HTMLInputElement} toggleComplete
     */
    showHideCompletedTodos(event, toggleComplete) {

    }

    /**
     * @param {number} todoId
     */
    toggleTodoCompleteStatus(todoId) {

    }

    /**
     * Renders the entire list to the DOM.
     */
    renderAll() {
        for (const [id, todo] of this.todos.entries()) {
            const wrapper = document.createElement('li');
            wrapper.className = 'todo_row';
            wrapper.setAttribute('data-id', id);

            const label = document.createElement('label');
            label.className = 'todo_label';
            label.innerText = todo.text;
            wrapper.appendChild(label);

            const toggle = document.createElement('input');
            toggle.className = 'todo_toggle';
            toggle.type = 'checkbox';
            toggle.checked = todo.isComplete ? true : false;
            wrapper.appendChild(toggle);

            const remove = document.createElement('button');
            remove.innerText = 'Remove';
            wrapper.appendChild(remove);

            this.todoArea.appendChild(wrapper);
        }
    }
}


function main() {
    const todoArea = document.getElementById('todo_area');
    const todoInput = document.getElementById('new_todo_input');
    const todoSubmit = document.getElementById('new_todo_submit');
    const toggleComplete = document.getElementById('toggle_complete');
    const removeComplete = document.getElementById('remove_complete');
    const removeAll = document.getElementById('remove_all');

    const app = new TodoApp(todoArea);
    app.renderAll();
}

window.addEventListener('DOMContentLoaded', main);
