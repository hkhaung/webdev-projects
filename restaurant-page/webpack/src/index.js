import './index.css';

import { homeDisplay } from './home';
import { menuDisplay } from './menu';
import { aboutDisplay } from './about';
import { orderOnlineDisplay } from './order-online';

document.addEventListener('DOMContentLoaded', function () {
    function displayContent(tabId) {
        switch (tabId) {
            case 'logo':
                homeDisplay();
                break;
            case 'menu':
                menuDisplay();
                break;
            case 'about':
                aboutDisplay();
                break;
            case 'order-online-btn':
                orderOnlineDisplay();
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


    // Activate home page by default
    tabs[0].classList.add('active');
    homeDisplay();
});

