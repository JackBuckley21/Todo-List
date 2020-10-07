class TodoApp {
  /**
   * @param {HTMLDivElement} todoArea
   */
  constructor(todoArea) {
    this.todoArea = todoArea;
    this.hideComplete = false;
    this.todos = new Map([
      [
        0,
        {
          text: "Implement the addTodo method",
          isComplete: false,
        },
      ],
      [
        1,
        {
          text: "Implement the removeTodo method",
          isComplete: false,
        },
      ],
      [
        2,
        {
          text: "Implement the clearCompletedTodos method",
          isComplete: false,
        },
      ],
      [
        3,
        {
          text: "Implement the removeAllTodos method",
          isComplete: false,
        },
      ],
      [
        4,
        {
          text: "Implement the showHideCompletedTodos method",
          isComplete: false,
        },
      ],
      [
        5,
        {
          text: "Implement the toggleTodoCompleteStatus method",
          isComplete: false,
        },
      ],
    ]);
    this.nextId = this.todos.size;
  }

  /**
   * @param {Event} event
   * @param {HTMLInputElement} todoInput
   */
  addTodo(event, todoInput) {
    event.preventDefault();

    if (!todoInput.value) {
      alert("Please enter valid todo item!");
    } else {
      this.todos.set(this.nextId, {
        text: todoInput.value,
        isComplete: false,
      });
    }

    todoInput.value = "";
    this.renderAll();
  }

  /**
   * @param {number} todoId
   */
  removeTodo(todoId) {
    this.todos.delete(todoId);
    this.renderAll();
  }

  /**
   * @param {Event} event
   */
  clearCompletedTodos(event) {
    event.preventDefault();

    for (const [id, todo] of this.todos.entries()) {
      if (todo.isComplete) {
        this.todos.delete(id);
      }
    }

    this.renderAll();
  }

  /**
   * @param {Event} event
   */
  removeAllTodos(event) {
    event.preventDefault();
    this.todos.clear();
    this.renderAll();
  }

  /**
   * @param {Event} event
   * @param {HTMLInputElement} toggleComplete
   */
  showHideCompletedTodos(event, toggleComplete) {
    event.preventDefault();
    this.hideComplete = !this.hideComplete;

    for (const [id, todo] of this.todos.entries()) {
      let div = document.querySelector(`[data-id="${id}"]`);
      if (this.hideComplete) {
        if (todo.isComplete) {
          div.classList.add("hidden");
        }
      } else {
        div.classList.remove("hidden");
      }
    }
  }

  /**
   * @param {number} todoId
   */
  toggleTodoCompleteStatus(todoId) {
    const todo = this.todos.get(todoId);

    this.todos.set(todoId, {
      text: todo.text,
      isComplete: !todo.isComplete,
    });
  }

  /**
   * Renders the entire list to the DOM.
   */
  renderAll() {
    this.todoArea.innerHTML = "";

    for (const [id, todo] of this.todos.entries()) {
      const wrapper = document.createElement("li");
      wrapper.className = "todo_row";
      wrapper.setAttribute("data-id", id);

      const label = document.createElement("label");
      label.className = "todo_label";
      label.innerText = todo.text;
      wrapper.appendChild(label);

      const toggle = document.createElement("input");
      toggle.className = "todo_toggle";
      toggle.type = "checkbox";
      toggle.checked = todo.isComplete ? true : false;
      toggle.addEventListener("click", (event) => {
        this.toggleTodoCompleteStatus(id);
      });
      wrapper.appendChild(toggle);

      const remove = document.createElement("button");
      remove.innerText = "Remove";
      remove.addEventListener("click", (event) => {
        this.removeTodo(id);
      });
      wrapper.appendChild(remove);

      this.todoArea.appendChild(wrapper);
    }
  }
}

function main() {
  const todoArea = document.getElementById("todo_area");
  const todoInput = document.getElementById("new_todo_input");
  const todoSubmit = document.getElementById("new_todo_submit");
  const toggleComplete = document.getElementById("toggle_complete");
  const removeComplete = document.getElementById("remove_complete");
  const removeAll = document.getElementById("remove_all");

  const app = new TodoApp(todoArea);
  app.renderAll();

  todoSubmit.addEventListener("click", (event) => {
    app.addTodo(event, todoInput);
  });

  toggleComplete.checked = this.hideComplete;
  toggleComplete.addEventListener("change", (event) => {
    app.showHideCompletedTodos(event, toggleComplete);
  });

  removeComplete.addEventListener("click", (event) => {
    app.clearCompletedTodos(event);
  });

  removeAll.addEventListener("click", (event) => {
    app.removeAllTodos(event);
  });
}

window.addEventListener("DOMContentLoaded", main);
