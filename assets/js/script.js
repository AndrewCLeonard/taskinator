// selectors
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function () {
	event.preventDefault();

	var listItemEl = document.createElement("li");
	listItemEl.className = "task-item";
	listItemEl.textContent = "This is a new task.";
	tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);

/*
document.createElement("li");
var taskItemEl = document.createElement("li");
taskItemEl.textContent = "hello";
taskItemEl;
var tasksToDoEl = document.querySelector("#tasks-to-do");
*/
