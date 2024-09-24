import { Task } from "./Task";

/*
Renders the following using helper functions into #content:
<div id="main">
	<div>What will you do today?</div>
	<div id="input-container">
		<input type="text" placeholder="I will...">
		<button class="input-btn"><span class="material-symbols-outlined">close</span></button>
		<button class="input-btn"><span class="material-symbols-outlined">sort</span></button>
	</div>

	<div class="tasks-container">
		<div id="date-actions-container">
			<div id="date"></div>
			<div id="actions">
				<button id="delete-btn">Delete</button>
				<button id="commit-btn">Commit</button>
			</div>
		</div>
		<div class="task" id="0">
			<button id="icon-container">
				<span class="material-symbols-outlined circle">circle</span>
				<span class="material-symbols-outlined check">task_alt</span>
			</button>
			<div class="title">Task Title 1</div>
			<span class="material-symbols-outlined high-priority">priority_high</span>
		</div>
		<div class="task" id="1">
			<button id="icon-container">
				<span class="material-symbols-outlined circle">circle</span>
				<span class="material-symbols-outlined check">task_alt</span>
			</button>
			<div class="title">Task Title 2</div>
		</div>
		<div class="task" id="2">
			<button id="icon-container">
				<span class="material-symbols-outlined circle">circle</span>
				<span class="material-symbols-outlined check">task_alt</span>
			</button>
			<div class="title">Task Title 3</div>
		</div>
	</div>
</div>
*/
export function displayTodo() {
    let contentDiv = document.getElementById("content");

    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("id", "main");
    const [input, closeButton, sortButton] = createInput(mainDiv);
    const tasksContainer = createTasksContainer(mainDiv);
    const [dateDiv, deleteBtn, commitBtn] = createDateActionsContainer(tasksContainer);
    createLineBreak(tasksContainer);

    // add functionality to elements that need it
    let tasksArray = []; // holds tasks not committed
    dateDivFunc(dateDiv);
    deleteBtnFunc(deleteBtn, tasksArray);
    formSubmitFunc(tasksArray);
    commitBtnFunc(commitBtn, tasksArray);
    inputFunc(tasksContainer, input, closeButton, sortButton, tasksArray);

    contentDiv.appendChild(mainDiv);
}

/*
Creates the following:
<div>What will you do today?</div>
<div id="input-container">
	<input type="text" placeholder="I will...">
	<button class="input-btn"><span class="material-symbols-outlined">close</span></button>
	<button class="input-btn"><span class="material-symbols-outlined">sort</span></button>
</div>
*/
function createInput(mainDiv) {
    let inputTitleDiv = document.createElement("div");
    inputTitleDiv.textContent = "What will you do today?";
    mainDiv.appendChild(inputTitleDiv);

    let inputContainerDiv = document.createElement("div");
    inputContainerDiv.setAttribute("id", "input-container");
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "I will...";
    input.name = "task-input";

    // close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("input-btn");
    const closeIcon = document.createElement("span");
    closeIcon.classList.add("material-symbols-outlined");
    closeIcon.textContent = "close";
    closeButton.appendChild(closeIcon);

    // sort button
    const sortButton = document.createElement("button");
    sortButton.classList.add("input-btn");
    const sortIcon = document.createElement("span");
    sortIcon.classList.add("material-symbols-outlined");
    sortIcon.textContent = "sort";
    sortButton.appendChild(sortIcon);

    inputContainerDiv.appendChild(input);
    inputContainerDiv.appendChild(closeButton);
    inputContainerDiv.appendChild(sortButton);

    mainDiv.appendChild(inputContainerDiv);

    return [input, closeButton, sortButton];
}

/*
Creates:
<div id="tasks-container">
	...
<div>
*/
export function createTasksContainer(mainDiv) {
    let tasksContainerDiv = document.createElement("div");
    tasksContainerDiv.classList.add("tasks-container");
    mainDiv.appendChild(tasksContainerDiv);
    return tasksContainerDiv;
}

/*
<div id="date-actions-container">
	<div id="date"></div>
	<div id="actions">
		<button id="delete-btn">Delete</button>
		<button id="commit-btn">Commit</button>
	</div>
</div>
*/
export function createDateActionsContainer(createTasksContainer) {
    let container = document.createElement("div");
    container.setAttribute("id", "date-actions-container");

    let dateDiv = document.createElement("div");
    dateDiv.setAttribute("id", "date");

    let actionsDiv = document.createElement("div");
    actionsDiv.setAttribute("id", "actions");
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "delete-btn");
    deleteBtn.textContent = "Delete";
    let commitBtn = document.createElement("button");
    commitBtn.setAttribute("id", "commit-btn");
    commitBtn.textContent = "Mark As Completed";

    actionsDiv.appendChild(deleteBtn);
    actionsDiv.appendChild(commitBtn);
    container.appendChild(dateDiv);
    container.appendChild(actionsDiv);
    createTasksContainer.appendChild(container);

    return [dateDiv, deleteBtn, commitBtn];
}

export function createLineBreak(container) {
    let line = document.createElement("hr");
    line.setAttribute("id", "line-break");
    container.appendChild(line);
}

/*
Creates each task based on what user inputs:
<div class="task" id="0">
	<button id="icon-container">
		<span class="material-symbols-outlined circle">circle</span>
		<span class="material-symbols-outlined check">task_alt</span>
	</button>
	<div class="title">Task Title 1</div>
	<span class="material-symbols-outlined high-priority">priority_high</span>
</div>
*/
export function createTask(tasksContainer, task) {
    let taskID = task.ID;
    let taskTitle = task.title;
    let taskIsHighPrio = task.isHighPrio;

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("id", taskID);

    // button icon-container
    let iconContainerBtn = document.createElement("button");
    iconContainerBtn.setAttribute("id", "icon-container");
    let circleIcon = document.createElement("span");
    circleIcon.classList.add("material-symbols-outlined", "circle", "shown");
    circleIcon.textContent = "circle";
    let checkIcon = document.createElement("span");
    checkIcon.classList.add("material-symbols-outlined", "check", "hidden");
    checkIcon.textContent = "task_alt";

    // task title
    let taskTitleDiv = document.createElement("div");
    taskTitleDiv.classList.add("title");
    taskTitleDiv.textContent = taskTitle;

    // high priority icon
    let taskIsHighPrioIcon = document.createElement("span");
    taskIsHighPrioIcon.textContent = "priority_high";
    if (taskIsHighPrio) {
        taskIsHighPrioIcon.classList.add("material-symbols-outlined", "high-priority");
    } else {
        taskIsHighPrioIcon.classList.add("material-symbols-outlined", "low-priority");
    }

    iconContainerBtn.appendChild(circleIcon);
    iconContainerBtn.appendChild(checkIcon);
    taskDiv.appendChild(iconContainerBtn);
    taskDiv.appendChild(taskTitleDiv);
    taskDiv.appendChild(taskIsHighPrioIcon);
    tasksContainer.appendChild(taskDiv);

    return [iconContainerBtn, circleIcon, checkIcon, taskTitleDiv, taskIsHighPrioIcon];
}

function dateDivFunc(dateDiv) {
    const currentDate = new Date();
    const year = String(currentDate.getFullYear());
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Get month (1-12) and pad with 0 if needed
    const day = String(currentDate.getDate()).padStart(2, "0"); // Get day and pad with 0 if needed
    const formattedDate = `${month}/${day}/${year}`;

    dateDiv.textContent = formattedDate;
}

function changeOpacity(hide = false, popup) {
    const navbar = document.querySelector("header");
    const content = document.getElementById("content");

    if (hide) {
        navbar.style.opacity = 0.1;
        content.style.opacity = 0.1;
        navbar.style.pointerEvents = "none";
        content.style.pointerEvents = "none";
        popup.style.display = "block";
    } else {
        navbar.style.opacity = 1;
        content.style.opacity = 1;
        navbar.style.pointerEvents = "auto";
        content.style.pointerEvents = "auto";
        popup.style.display = "none";
    }
}

function deleteBtnFunc(deleteBtn, tasksArray) {
    // create popup and show tasks in tasksArray
    let popup = document.querySelector(".popup");
    if (!popup) {
        popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
			<div class="popup-content">
				<h3>Select Tasks to Delete</h3>
				<form class="task-form">
					<button type="submit" name="action" value="delete" class="confirm-delete">Delete</button>
					<button type="submit" name="action" value="delete-all" class="delete-all">Delete All</button>
					<button type="submit" name="action" value="cancel" class="close-popup">Cancel</button>
				</form>
			</div>
		`;
        document.body.append(popup);
    }

    let header = popup.querySelector("h3");

    // Show the popup when the delete button is clicked and has tasks
    deleteBtn.addEventListener("click", (event) => {
        event.preventDefault();
        changeOpacity(true, popup);

        // clear popup tasks before adding each task in tasks array to form
        if (tasksArray.length > 0) {
            header.textContent = "Select Tasks to Delete";

            const checkboxContainers = popup.querySelectorAll(".checkbox-container");
            for (const container of checkboxContainers) {
                container.remove();
            }

            const taskForm = popup.querySelector(".task-form");
            for (const task of tasksArray) {
                const div = document.createElement("div");
                div.setAttribute("id", task.ID);
                div.classList.add("checkbox-container");

                const input = document.createElement("input");
                input.type = "checkbox";
                input.classList.add("task-checkbox");
                input.id = task.ID;
                input.name = task.title;

                const taskLabel = document.createElement("label");
                taskLabel.htmlFor = input.id;
                taskLabel.textContent = task.title;

                div.appendChild(input);
                div.appendChild(taskLabel);
                taskForm.insertBefore(div, taskForm.firstChild);
            }
        } else {
            header.textContent = "There are no tasks to delete";
        }
    });
}

function formSubmitFunc(tasksArray) {
    const form = document.querySelector(".task-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const clickedButton = event.submitter;
        let tasksMain = [];

        if (clickedButton.value === "delete") {
            const elements = document.querySelectorAll(".task-checkbox:checked");
            elements.forEach((element) => {
                tasksMain.push(element.id);
            });

            if (tasksMain.length > 0) {
                const mainDiv = document.getElementById("main");
                for (const id of tasksMain) {
                    mainDiv.querySelector(`#${id}`).remove();
                    const taskIndex = tasksArray.findIndex((task) => task.ID === id);
                    if (taskIndex !== -1) {
                        tasksArray.splice(taskIndex, 1);
                    }
                }

                const checkboxContainers = document.querySelectorAll(".checkbox-container");
                checkboxContainers.forEach((container) => {
                    elements.forEach((element) => {
                        if (element.id === container.id) {
                            container.remove();
                        }
                    });
                });
            }
        } else if (clickedButton.value === "delete-all") {
            const elements = document.querySelectorAll(".checkbox-container");
            elements.forEach((element) => {
                tasksMain.push(element.id);
                element.remove();
            });

            if (tasksMain.length > 0) {
                const mainDiv = document.getElementById("main");
                for (const id of tasksMain) {
                    mainDiv.querySelector(`#${id}`).remove();
                    const taskIndex = tasksArray.findIndex((task) => task.ID === id);
                    if (taskIndex !== -1) {
                        tasksArray.splice(taskIndex, 1);
                    }
                }
            }
        }

        // cancel
        changeOpacity(false, document.querySelector(".popup"));
    });
}

function commitBtnFunc(commitBtn, tasksArray) {
    let popup = document.querySelector("#commit-popup");
    if (!popup) {
        popup = document.createElement("div");
        popup.classList.add("popup");
        popup.setAttribute("id", "commit-popup");
        popup.innerHTML = `
			<div class="popup-content">
				<h3>There are no quests to commit to history<h3>
				<form class="task-form">
					<button type="submit" name="action" value="ok" class="ok-popup">Ok</button>
				</form>
			</div>
		`;
        document.body.append(popup);
    }

    commitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        changeOpacity(true, popup);

        let header = popup.querySelector("h3");
        if (tasksArray.length === 0) {
            return;
        } else {
            let date = new Date();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();

            localStorage.setItem(`${document.getElementById("date").textContent}-${hour}:${minute}:${second}`, JSON.stringify(tasksArray));
            header.textContent = `${tasksArray.length} ${tasksArray.length === 1 ? "quest" : "quests"} added to History! Nice job!`;
        }
    });

    const form = document.querySelector(".task-form");
    form.addEventListener("submit", function (event) {
        changeOpacity(false, popup);
    });
}

/* Creates a task based on input and adds functionality to elements related to the task */
function inputFunc(tasksContainer, inputElement, closeBtn, sortBtn, tasksArray) {
    function closeBtnFunc(closeBtn) {
        closeBtn.addEventListener("click", () => {
            inputElement.value = "";
        });
    }

    function sortBtnFunc(sortBtn, icon) {
        sortBtn.addEventListener("click", () => {
            isHighPrio = !isHighPrio;

            if (isHighPrio) {
                icon.style.color = "red";
            } else {
                icon.style.color = "";
            }
        });
    }

    closeBtnFunc(closeBtn);
    let isHighPrio = false;
    let icon = sortBtn.querySelector(".material-symbols-outlined");
    sortBtnFunc(sortBtn, icon);

    let newTask = null;
    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && inputElement.value) {
            newTask = new Task(inputElement.value, isHighPrio);
            const [iconContainerBtn, circleIcon, checkIcon, taskTitleDiv, taskIsHighPrioIcon] = createTask(tasksContainer, newTask);

            // add functionality to task elements
            taskTitleDivFunc(taskTitleDiv, newTask);
            taskIsHighPrioIconFunc(taskIsHighPrioIcon, newTask);
            iconContainerBtnFunc(iconContainerBtn, circleIcon, checkIcon, newTask);

            // reset after
            inputElement.value = "";
            isHighPrio = false;
            icon.style.color = "";

            tasksArray.unshift(newTask);
        }
    });
}

// [iconContainerBtn, circleIcon, checkIcon, taskTitleDiv, taskIsHighPrioIcon]
function iconContainerBtnFunc(iconContainerBtn, circleIcon, checkIcon, newTask) {
    iconContainerBtn.addEventListener("click", () => {
        if (circleIcon.classList[2] === "shown") {
            circleIcon.classList.replace("shown", "hidden");
            checkIcon.classList.replace("hidden", "shown");
        } else {
            checkIcon.classList.replace("shown", "hidden");
            circleIcon.classList.replace("hidden", "shown");
        }
        newTask.isDone = !newTask.isDone;
    });
}

function taskTitleDivFunc(taskTitleDiv, newTask) {
    taskTitleDiv.addEventListener("dblclick", () => {
        const currentText = taskTitleDiv.textContent;

        // Create an input element
        const input = document.createElement("input");
        input.classList.add("edit-input");
        input.type = "text";
        input.value = currentText;

        // Replace the div content with the input field
        taskTitleDiv.textContent = "";
        taskTitleDiv.appendChild(input);

        input.focus();

        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                if (input.value.length > 0) {
                    taskTitleDiv.textContent = input.value;
                    newTask.title = input.value;
                } else {
                    taskTitleDiv.textContent = currentText;
                }
            }
        });

        // If the input loses focus, revert back to the original text
        input.addEventListener("blur", () => {
            taskTitleDiv.textContent = currentText;
        });
    });
}

function taskIsHighPrioIconFunc(taskIsHighPrioIcon, newTask) {
    taskIsHighPrioIcon.addEventListener("click", () => {
        let priority = taskIsHighPrioIcon.classList[1];
        if (priority == "low-priority") {
            taskIsHighPrioIcon.classList.replace("low-priority", "high-priority");
            newTask.isHighPrio = true;
        } else {
            taskIsHighPrioIcon.classList.replace("high-priority", "low-priority");
            newTask.isHighPrio = false;
        }
    });
}
