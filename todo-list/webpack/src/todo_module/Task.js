export class Task {
    // Declare private fields using '#'
    #id;
    #title;
    #isHighPrio;
    #isDone;

    constructor(title, isHighPrio = false, isDone = false) {
        this.#id = this.#generateRandomID();
        this.#title = title;
        this.#isHighPrio = isHighPrio;
        this.#isDone = isDone;
    }

    get ID() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    set title(newTitle) {
        this.#title = newTitle;
    }

    get isHighPrio() {
        return this.#isHighPrio;
    }

    set isHighPrio(isHighPriority) {
        this.#isHighPrio = isHighPriority;
    }

    get isDone() {
        return this.#isDone;
    }

    set isDone(isDone) {
        this.#isDone = isDone;
    }

    /* 
    generates a unique ID
    source: https://blog.brightcoding.dev/2023/08/06/a-comprehensive-guide-to-generating-unique-ids-in-javascript/#:~:text=The%20Math.,random()%20Method&text=random()%20method%20is%20a,to%20form%20a%20unique%20identifier.
    */
    #generateRandomID() {
        return Math.random().toString(36).substr(2, 9);
    }
}


