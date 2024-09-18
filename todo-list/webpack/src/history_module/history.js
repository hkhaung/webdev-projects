import { createTasksContainer } from "../todo_module/todo";
import { createDateActionsContainer } from "../todo_module/todo";
import { createTask } from "../todo_module/todo";
import { createLineBreak } from "../todo_module/todo";

/*
Renders the following
<div id="commit-main">
    <div>Commit History</div>
    <div id="commits-container">
        <div class="tasks-container">
            <div id="date-actions-container">
                <div id="date">09/16/24 - 11:40:45</div>
                <div id="actions">
                    <button id="delete-btn">Delete From History</button>
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
        </div>

        <div class="tasks-container">
            <div id="date-actions-container">
                <div id="date">09/16/24 - 11:40:45</div>
                <div id="actions">
                    <button id="delete-btn">Delete From History</button>
                </div>
            </div>

            <div class="task" id="0">
                <button id="icon-container">
                    <span class="material-symbols-outlined circle">circle</span>
                    <span class="material-symbols-outlined check">task_alt</span>
                </button>
                <div class="title">Task Title 3</div>
                <span class="material-symbols-outlined high-priority">priority_high</span>
            </div>
        </div>
    </div>
    </div>
</div> 
*/
export function historyDisplay() {
    let contentDiv = document.getElementById('content');

    let mainDiv = document.createElement('div');
	mainDiv.setAttribute('id', 'commit-main');

    let commitHistoryDiv = document.createElement('div');
    commitHistoryDiv.textContent = `Completed Tasks${localStorage.length === 0 ? '' : ` (${localStorage.length})`}`;
    
    let commitsContainer = document.createElement('div');
    commitsContainer.setAttribute('id', 'commits-container');

    mainDiv.appendChild(commitHistoryDiv);
    mainDiv.appendChild(commitsContainer);
    contentDiv.appendChild(mainDiv);

    // go through local storage and add task containers
    addTaskContainers(commitsContainer);
}

function sortLocalStorageByKey() {
    function parseDateFromKey(key) {
        const [datePart, timePart] = key.split('-');
        const [month, day, year] = datePart.split('/');
        const [hours, minutes, seconds] = timePart.split(':');

        return new Date(year, month - 1, day, hours, minutes, seconds);
    }
    const localStorageEntries = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));
        localStorageEntries.push({ key, value });
    }

    localStorageEntries.sort((a, b) => {
        const dateA = parseDateFromKey(a.key);
        const dateB = parseDateFromKey(b.key);
        return dateB - dateA;
    });

    return localStorageEntries;
}

function addTaskContainers(commitsContainer) {
    commitsContainer.innerHTML = '';

    if (localStorage.length === 0) {
        const commitMainDiv = document.getElementById('commit-main');
        const commitHistoryDiv = commitMainDiv.firstElementChild;
        commitHistoryDiv.textContent = 'No tasks added so far...';
        return;
    }

    const sortedLocalStorage = sortLocalStorageByKey();

    for (let i = 0; i < sortedLocalStorage.length; i++) {
        let object = sortedLocalStorage[i];
        let key = object.key;
        let taskObjectArray = object.value;
        
        // create tasks-container
        let tasksContainerDiv = createTasksContainer(commitsContainer);
        tasksContainerDiv.setAttribute('id', key);

        // handle date actions container
        handleDateActionsContainer(tasksContainerDiv, key);

        // add line break after date actions container
        createLineBreak(tasksContainerDiv);

        // handle each task in taskObject and append to tasksContainer
        handleTaskInTaskObject(tasksContainerDiv, taskObjectArray);
    }
}

function handleDateActionsContainer(tasksContainerDiv, key) {
    function formatTime(time) {
        let [hours, minutes, seconds] = time.split(':');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        hours = hours < 10 ? '0' + hours : hours;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    let [dateDiv, deleteBtn, commitBtn] = createDateActionsContainer(tasksContainerDiv);
    let [date, time] = key.split('-');
    time = formatTime(time);
    dateDiv.textContent = `${date} - ${time}`;
    deleteBtn.setAttribute('id', 'delete-btn');
    deleteBtn.textContent = 'Delete From History';
    commitBtn.remove();

    // add delete button functionality
    commitDeleteBtnFunc(deleteBtn, key);
}

function commitDeleteBtnFunc(deleteBtn, key) {
    deleteBtn.addEventListener('click', () => {
        localStorage.removeItem(key);
        document.getElementById(key).remove();

        const commitMainDiv = document.getElementById('commit-main');
        const commitHistoryDiv = commitMainDiv.firstElementChild;
        commitHistoryDiv.textContent = `Completed Tasks${localStorage.length === 0 ? '' : ` (${localStorage.length})`}`;

        if (localStorage.length === 0) {
            const commitMainDiv = document.getElementById('commit-main');
            const commitHistoryDiv = commitMainDiv.firstElementChild;
            commitHistoryDiv.textContent = 'No tasks added so far...';
            return;
        }
    });
}

function handleTaskInTaskObject(tasksContainerDiv, taskObjectArray) {
    for (let i = taskObjectArray.length - 1; i >= 0; i--) {
        let taskObject = taskObjectArray[i];
        let [iconContainerBtn, circleIcon, checkIcon, _, taskIsHighPrioIcon] = createTask(tasksContainerDiv, taskObject);        
        iconContainerBtn.setAttribute('id', 'commit-icon-container');
        circleIcon.style.cursor = 'default';
        checkIcon.style.cursor = 'default';
        taskIsHighPrioIcon.style.cursor = 'default';
        handleIconContainerBtn(circleIcon, checkIcon, taskObject);
    }
}

function handleIconContainerBtn(circleIcon, checkIcon, task) {
    if (task.isDone) {
        circleIcon.classList.replace('shown', 'hidden');
        checkIcon.classList.replace('hidden', 'shown');
    } else {
        checkIcon.classList.replace('shown', 'hidden');
        circleIcon.classList.replace('hidden', 'shown');
    }
}

