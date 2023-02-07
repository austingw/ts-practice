interface Todo {
  text: string;
  completed: boolean;
}

const btn = document.getElementById("btn")!;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;

const todos: Todo[] = parseTodos();
todos.forEach(createTodoEl);

function parseTodos(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON === null) return [];
  return JSON.parse(todosJSON);
}

function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const newTodoItem: Todo = {
    text: input.value,
    completed: false,
  };
  createTodoEl(newTodoItem);
  todos.push(newTodoItem);

  localStorage.setItem("todos", JSON.stringify(todos));
  input.value = "";
}

function createTodoEl(todo: Todo) {
  const newLI = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;
    localStorage.setItem("todos", JSON.stringify(todos));
  });
  newLI.append(todo.text);
  newLI.append(checkbox);
  list?.append(newLI);
}

form.addEventListener("submit", handleSubmit);
