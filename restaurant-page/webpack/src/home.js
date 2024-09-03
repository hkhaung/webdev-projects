
export function homeDisplay() {
    let contentElement = document.getElementById('content');
    contentElement.innerHTML = ''; // Clear previous content
    
    let restaurantDiv = document.createElement('div');
    restaurantDiv.setAttribute('id', 'home');
    let restaurantNameDiv = document.createElement('div');
    restaurantNameDiv.textContent = 'Citrus Grove Delight';
    let restaurantLocationDiv = document.createElement('div');
    restaurantLocationDiv.textContent = 'Orange County, California';
    restaurantDiv.appendChild(restaurantNameDiv);
    restaurantDiv.appendChild(restaurantLocationDiv);
    
    contentElement.appendChild(restaurantDiv);
}