export function orderOnlineDisplay() {
    let contentElement = document.getElementById('content');
    contentElement.innerHTML = ''; // Clear previous content
    
    let inconstructionElement = document.createElement('div');
    inconstructionElement.textContent = 'ORDER ONLINE: in construction';
    inconstructionElement.style['text-align'] = 'center';

    contentElement.appendChild(inconstructionElement);
}