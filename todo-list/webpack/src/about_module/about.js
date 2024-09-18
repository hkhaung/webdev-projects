export function aboutDisplay() {
    let contentDiv = document.getElementById('content');

    let mainDiv = document.createElement('div');
	mainDiv.setAttribute('id', 'main');
    mainDiv.textContent = 'Under construction...';

    contentDiv.appendChild(mainDiv);
}