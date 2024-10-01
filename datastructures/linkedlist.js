class LinkedList {
    // will always have a dummy head node
    #head;
    #tail;
    #num_nodes;
    
    constructor() {
        this.#head = new Node();
        this.#tail = this.#head;
        this.#num_nodes = 0;
    }

    append(value) {
        this.#tail.setNextNode(new Node(value));
        this.#tail = this.#tail.getNextNode();
        this.num_nodes++;
    }

    prepend(value) {
        let old_node = this.#head.getNextNode();
        let new_node = new Node(value);
        this.#head.setNextNode(new_node);

        new_node.setNextNode(old_node)
        this.#num_nodes++;
    }

    size() {
        return this.#num_nodes;
    }

    head() {
        return this.#head.nextNode;
    }

    tail() {
        return this.#tail;
    }

    at(index) {
        let curr = this.#head.getNextNode();
        
        let i = 0;
        while (curr) {
            if (i == index) {
                return curr
            }            
            i++;
            curr = this.curr.getNextNode();
        }
    }

    pop() {
        this.#tail.setValue(null)
        this.#tail.setNextNode(null)
    }

    contains(value) {
        let curr = this.#head.getNextNode();
        while (curr) {
            if (curr.value == value) {
                return true;
            }
            curr = this.curr.getNextNode();
        }
        return false;
    }

    find(value) {
        let index = null
        let curr = this.#head.getNextNode();
        while (curr) {
            if (curr.value == value) {
                return index;
            }
            curr = this.curr.getNextNode();
            index++;
        }
        return index;
    }

    toString() {
        let stringified = ''
        let curr = this.#head.getNextNode();
        while (curr) {
            stringified += `( ${curr.getValue()} )`
            curr = curr.getNextNode();
            stringified += ' -> '
        }

        stringified += 'null'
        console.log(stringified);
    }

}

class Node {
    #value;
    #nextNode;

    constructor(value=null, nextNode=null) {
        this.#value = value;
        this.#nextNode = nextNode;
    }

    getValue() {
        return this.#value;
    }

    setValue(new_value) {
        this.#value = new_value;
    }

    getNextNode() {
        return this.#nextNode;
    }

    setNextNode(new_node) {
        this.#nextNode = new_node;
    }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

list.toString(); // should be ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null