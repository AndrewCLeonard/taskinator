/*
Left off spot text to search:
 We didn't add data-task-id attributes to these elements, so how do we find them? We already have the parent <li> element, so we can use that as a querySelector() starting point.
 https://courses.bootcampspot.com/courses/951/pages/4-dot-3-8-add-the-ability-to-edit-a-task?module_item_id=330250
*/
// selectors
var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var taskFormHandler = function (event) {
	event.preventDefault();
	var taskNameInput = document.querySelector("input[name='task-name']").value;
	var taskTypeInput = document.querySelector(
		"select[name='task-type']"
	).value;

	// check if input values are empty strings
	if (taskNameInput === "" || taskTypeInput === "") {
		alert("You need to fill out the task form!");
		return false;
	}

	formEl.reset();

	var isEdit = formEl.hasAttribute("data-task-id");

	// has data attribute, so get task id and call function ot complete edit process
	if (isEdit) {
		var taskId = formEl.getAttribute("data-task-id");
		completeEditTask(taskNameInput, taskTypeInput, taskId);
	}

	// no data attribute, so create object as normal and pass to createTaskEl function
	else {
		var taskDataObj = {
			name: taskNameInput,
			type: taskTypeInput,
		};

		// send it as an argument to createTaskEl
		createTaskEl(taskDataObj);
	}
};
// creates: TaskEl, taskId, taskInfoEl, taskActionsEl, & increments counter
var createTaskEl = function (taskDataObj) {
	// create list item
	var listItemEl = document.createElement("li");
	listItemEl.className = "task-item";

	// add task id as a custom attribute
	listItemEl.setAttribute("data-task-id", taskIdCounter);

	// create div to hold task info and add to list item
	var taskInfoEl = document.createElement("div");
	taskInfoEl.className = "task-info";
	taskInfoEl.innerHTML =
		"<h3 class='task-name'>" +
		taskDataObj.name +
		"</h3><span class='task-type'>" +
		taskDataObj.type +
		"</span>";
	listItemEl.appendChild(taskInfoEl);

	// create task actions (buttons and select) for task
	var taskActionsEl = createTaskActions(taskIdCounter);
	listItemEl.appendChild(taskActionsEl);
	tasksToDoEl.appendChild(listItemEl);

	// increment taskIdCounter for next unique ID
	taskIdCounter++;
};

// action buttons for each task
var createTaskActions = function (taskId) {
	// create container to hold elements
	var actionContainerEl = document.createElement("div");
	actionContainerEl.className = "task-actions";

	// create edit button
	var editButtonEl = document.createElement("button");
	editButtonEl.textContent = "Edit";
	editButtonEl.className = "btn edit-btn";
	editButtonEl.setAttribute("data-task-id", taskId);
	actionContainerEl.appendChild(editButtonEl);
	// create delete button
	var deleteButtonEl = document.createElement("button");
	deleteButtonEl.textContent = "Delete";
	deleteButtonEl.className = "btn delete-btn";
	deleteButtonEl.setAttribute("data-task-id", taskId);
	actionContainerEl.appendChild(deleteButtonEl);
	// create change status dropdown
	var statusSelectEl = document.createElement("select");
	statusSelectEl.setAttribute("name", "status-change");
	statusSelectEl.setAttribute("data-task-id", taskId);
	statusSelectEl.className = "select-status";
	actionContainerEl.appendChild(statusSelectEl);
	// create status options
	var statusChoices = ["To Do", "In Progress", "Completed"];

	for (var i = 0; i < statusChoices.length; i++) {
		// create option element
		var statusOptionEl = document.createElement("option");
		statusOptionEl.setAttribute("value", statusChoices[i]);
		statusOptionEl.textContent = statusChoices[i];

		// append to select
		statusSelectEl.appendChild(statusOptionEl);
	}

	return actionContainerEl;
};

var completeEditTask = function (taskName, taskType, taskId) {
	// find the matching task list item
	var taskSelected = document.querySelector(
		".task-item[data-task-id='" + taskId + "']"
	);

	// set new values
	taskSelected.querySelector("h3.task-name").textContent = taskName;
	taskSelected.querySelector("span.task-type").textContent = taskType;

	alert("Task Updated!");

	// reset form by removing the task id and changing the button text back to normal
	formEl.removeAttribute("data-task-id");
	// update formEl button to go back to saying "Add Task" instead of "Edit Task"
	formEl.querySelector("#save-task").textContent = "Add Task";
};

// task button functionality
var taskButtonHandler = function (event) {
	// get target element from event
	var targetEl = event.target;
	// event button was clicked
	if (event.target.matches(".edit-btn")) {
		var taskId = targetEl.getAttribute("data-task-id");
		editTask(taskId);
	}
	// delete button was clicked
	else if (event.target.matches(".delete-btn")) {
		var taskId = targetEl.getAttribute("data-task-id");
		deleteTask(taskId);
	}
};

// change task status
var taskStatusChangeHandler = function (event) {
	// get the task item's id
	var taskId = event.target.getAttribute("data-task-id");

	// get the currently selected option's value and convert to lowercase
	var statusValue = event.target.value.toLowerCase();

	// find the parent task item element based on the id
	var taskSelected = document.querySelector(
		".task-item[data-task-id='" + taskId + "']"
	);

	if (statusValue === "to do") {
		tasksToDoEl.appendChild(taskSelected);
	}
	else if (statusValue === "in progress") {
		tasksInProgressEl.appendChild(taskSelected);
	}
	else if (statusValue === "completed") {
		tasksCompletedEl.appendChild(taskSelected);
	}
};

// task edit functionality
var editTask = function (taskId) {
	// get task list item element
	var taskSelected = document.querySelector(
		".task-item[data-task-id='" + taskId + "']"
	);

	// get content from task name and type
	var taskName = taskSelected.querySelector("h3.task-name").textContent;

	var taskType = taskSelected.querySelector("span.task-type").textContent;
	document.querySelector("input[name='task-name']").value = taskName;
	document.querySelector("select[name='task-type']").value = taskType;

	// set data attribute to the form with a value of the task's id so it knows which one is being edited
	formEl.setAttribute("data-task-id", taskId);
};

// Delete tasks
var deleteTask = function (taskId) {
	var taskSelected = document.querySelector(
		".task-item[data-task-id='" + taskId + "']"
	);
	taskSelected.remove();
};

// event listener: reate a new task
formEl.addEventListener("submit", taskFormHandler);

// event listener: for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
