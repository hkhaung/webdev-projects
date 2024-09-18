import './index.css';
import './todo_module/todo.css';
import './history_module/history.css';

import { historyDisplay } from './history_module/history';
import { aboutDisplay } from './about_module/about';
import { displayTodo } from './todo_module/todo';

// TODO signin and register buttons and functionality

document.addEventListener('DOMContentLoaded', function () {
    function setupDisplay() {
        let contentElement = document.getElementById('content');
        contentElement.innerHTML = ''; // Clear previous content
    }

    function displayContent(tabId) {
        setupDisplay();
        switch (tabId) {
            case 'history':
                historyDisplay();
                break;
            case 'about':
                aboutDisplay();
                break;
            case 'signin-btn':
                // signinDisplay();
                break;
            case 'register-btn':
                // registerDisplay();
                break;
            default:
                displayTodo();
                break;
        }
    }

    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(btn => btn.classList.remove('active'));
            tab.classList.add('active');
            const tabId = tab.getAttribute('id');
            displayContent(tabId);
        });
    });


    // Show todo list by default
    tabs[0].classList.add('active');
    displayTodo();
});

