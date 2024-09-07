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

	<div id="tasks-container">
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
	let contentDiv = document.getElementById('content');

    let mainDiv = document.createElement('div');
	mainDiv.setAttribute('id', 'main');
    const [input, closeButton, sortButton] = createInput(mainDiv);
	const tasksContainer = createTasksContainer(mainDiv);

	// add functionality to elements that need it
	inputFunc(tasksContainer, input, closeButton, sortButton);

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
	let inputTitleDiv = document.createElement('div');
    inputTitleDiv.textContent = 'What will you do today?';
    mainDiv.appendChild(inputTitleDiv);

    let inputContainerDiv = document.createElement('div');
    inputContainerDiv.setAttribute('id', 'input-container');
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'I will...';

	// close button
	const closeButton = document.createElement('button');
	closeButton.classList.add('input-btn');
	const closeIcon = document.createElement('span');
	closeIcon.classList.add('material-symbols-outlined');
	closeIcon.textContent = 'close';
	closeButton.appendChild(closeIcon);

	// sort button
	const sortButton = document.createElement('button');
	sortButton.classList.add('input-btn');
	const sortIcon = document.createElement('span');
	sortIcon.classList.add('material-symbols-outlined');
	sortIcon.textContent = 'sort';
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
function createTasksContainer(mainDiv) {
	let tasksContainerDiv = document.createElement('div');
	tasksContainerDiv.setAttribute('id', 'tasks-container');
	mainDiv.appendChild(tasksContainerDiv);
	return tasksContainerDiv;
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
function createTask(tasksContainer, task) {
	let taskID = task.ID;
	let taskTitle = task.title;
	let taskIsHighPrio = task.isHighPrio;

	console.log(taskID, taskTitle, taskIsHighPrio);

	let taskDiv = document.createElement('div');
	taskDiv.classList.add('task');
	taskDiv.setAttribute('id', taskID);

	// button icon-container
	let iconContainerBtn = document.createElement('button');
	iconContainerBtn.setAttribute('id', 'icon-container');
	let circleIcon = document.createElement('span');
	circleIcon.classList.add('material-symbols-outlined', 'circle');
	circleIcon.textContent = 'circle';
	let checkIcon = document.createElement('span');
	checkIcon.classList.add('material-symbols-outlined', 'check');
	checkIcon.textContent = 'task_alt';

	// task title
	let taskTitleDiv = document.createElement('div');
	taskTitleDiv.classList.add('title');
	taskTitleDiv.textContent = taskTitle;

	// high priority icon
	let taskIsHighPrioIcon = document.createElement('span');
	taskIsHighPrioIcon.textContent = 'priority_high';
	if (taskIsHighPrio) {
		taskIsHighPrioIcon.classList.add('material-symbols-outlined', 'high-priority');
	} else {
		taskIsHighPrioIcon.classList.add('material-symbols-outlined', 'low-priority');		
	}
	
	iconContainerBtn.appendChild(circleIcon);
	iconContainerBtn.appendChild(checkIcon);
	taskDiv.appendChild(iconContainerBtn);
	taskDiv.appendChild(taskTitleDiv);
	taskDiv.appendChild(taskIsHighPrioIcon);
	tasksContainer.appendChild(taskDiv);

	return [iconContainerBtn, circleIcon, checkIcon, taskTitleDiv, taskIsHighPrioIcon];
}

/* Creates a task based on input and adds functionality to elements related to the task */
function inputFunc(tasksContainer, inputElement, closeBtn, sortBtn) {
	function closeBtnFunc(closeBtn) {
		closeBtn.addEventListener('click', () => {
			inputElement.value = '';
		});
	}
	
	function sortBtnFunc(sortBtn, icon) {
		sortBtn.addEventListener('click', () => {
			isHighPrio = !isHighPrio;
			
			if (isHighPrio) {
				icon.style.color = 'red';
			} else {
				icon.style.color = '';
			}
		});
	}

	closeBtnFunc(closeBtn);
	let isHighPrio = false;
	let icon = sortBtn.querySelector('.material-symbols-outlined');
	sortBtnFunc(sortBtn, icon);

	let newTask = null;
	inputElement.addEventListener('keydown', function(event) {
		if (event.key === 'Enter') {
			newTask = new Task(inputElement.value, isHighPrio);
			const [iconContainerBtn, circleIcon, checkIcon, taskTitleDiv] = createTask(tasksContainer, newTask);

			// add functionality to task elements
			taskTitleDivFunc(taskTitleDiv);

			// reset after
			inputElement.value = '';
			isHighPrio = false;
			icon.style.color = ''
		}
	});

	return newTask;
}

// [iconContainerBtn, circleIcon, checkIcon, taskTitleDiv, taskIsHighPrioIcon]
function iconContainerBtnFunc() {

}

function taskTitleDivFunc(taskTitleDiv) {
	taskTitleDiv.addEventListener('dblclick', () => {
		const currentText = taskTitleDiv.textContent;
	
		// Create an input element
		const input = document.createElement('input');
		input.type = 'text';
		input.value = currentText;
	
		// Replace the div content with the input field
		taskTitleDiv.textContent = ''; // Clear the current text
		taskTitleDiv.appendChild(input); // Add the input field
	
		input.focus();
	
		input.addEventListener('keydown', function(event) {
			if (event.key === 'Enter') {
				taskTitleDiv.textContent = input.value;
			}
		});
	
		// If the input loses focus, revert back to the original text
		input.addEventListener('blur', () => {
			taskTitleDiv.textContent = currentText;
		});

		// TODO: input css
	});
}

function taskIsHighPrioIcon() {
	
}
