"use strict";
const btn = document.getElementById("btn");
const input = document.getElementById("todoinput");
const form = document.querySelector("form");
const list = document.getElementById("todolist");
const todos = parseTodos();
todos.forEach(createTodoEl);
function parseTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
function handleSubmit(e) {
    e.preventDefault();
    const newTodoItem = {
        text: input.value,
        completed: false,
    };
    createTodoEl(newTodoItem);
    todos.push(newTodoItem);
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";
}
function createTodoEl(todo) {
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
    list === null || list === void 0 ? void 0 : list.append(newLI);
}
form.addEventListener("submit", handleSubmit);
