class HashMap {
    #hashmap;
    #capacity;
    #num_stored_keys;
    #load_factor = 0.75;

    constructor() {
        this.#capacity = 16;
        this.#hashmap = new Array(this.#capacity).fill(null);
        this.#num_stored_keys = 0;
    }

    #hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    #check_index_within_bounds(index) {
        return index >= 0 && index < this.#hashmap.length;
    }

    getCurrentLoadFactor() {
        return this.#num_stored_keys / this.#capacity;
    }

    getNumStoredKeys() {
        return this.#num_stored_keys;
    }

    getCapacity() {
        return this.#capacity;
    }

    resize() {
        const newCapacity = this.#capacity * 2;
        const newHashMap = new Array(newCapacity).fill(null);

        // Rehash existing keys
        for (let i = 0; i < this.#capacity; i++) {
            if (this.#hashmap[i] !== null) {
                const [key, value] = this.#hashmap[i];
                const newHashedKey = this.#hash(key);
                const newIndex = newHashedKey % newCapacity;
                newHashMap[newIndex] = [key, value];
            }
        }

        this.#capacity = newCapacity;
        this.#hashmap = newHashMap;
    }

    set(key, value) {
        let hashed_key = this.#hash(key);
        let index = hashed_key % this.#capacity;

        if (this.#num_stored_keys >= this.#capacity * this.#load_factor) {
            this.resize();
            index = hashed_key % this.#capacity; // Recalculate index after resizing
        }

        if (this.#hashmap[index] == null) {
            this.#num_stored_keys++;
        }

        this.#hashmap[index] = [key, value];
    }

    get(key) {
        let hashed_key = this.#hash(key);
        let index = hashed_key % this.#capacity;

        if (!this.#check_index_within_bounds(index) || this.#hashmap[index] === null) {
            return null;
        }
        return this.#hashmap[index][1];
    }

    has(key) {
        return this.get(key) ? true : false;
    }

    remove(key) {
        let hashed_key = this.#hash(key);
        let index = hashed_key % this.#capacity;

        if (!this.#check_index_within_bounds(index) || this.#hashmap[index] === null) {
            return false;
        }

        let removed_value = this.#hashmap[index][1];
        this.#hashmap[index] = null;
        this.#num_stored_keys--;
        return true;
    }

    clear() {
        this.#hashmap.fill(null);
        this.#num_stored_keys = 0;
    }

    length() {
        return this.#num_stored_keys;
    }

    keys() {
        return this.#hashmap
            .filter((item) => item !== null)
            .map((item) => item[0]);
    }

    values() {
        return this.#hashmap
            .filter((item) => item !== null)
            .map((item) => item[1]);
    }

    entries() {
        return this.#hashmap.filter((item) => item !== null);
    }

    toString() {
        let result = "";
        for (const item of this.#hashmap) {
            result +=
                item === null ? "(null, null)\n" : `(${item[0]}, ${item[1]})\n`;
        }
        console.log(result);
    }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("bear", "golden");

test.toString(); // should print out the above
console.log(test.keys()); // should show keys
console.log(test.values()); // should show values
console.log(test.entries()); // show key value pairs

test.set("elephant", "you");
test.set("banana", "red");
test.set("dog", "cat");
test.set("bear", "gob ears"); // should still be the same size but different values

test.toString();

test.set("moon1", "silver1");
test.set("moon3", "silver3");
test.set("hello, ", "world!");
test.toString();
console.log(test.getNumStoredKeys());
console.log(test.getCapacity()); // should have new capacity

console.log(test.get("bear")); // should return gob ears
console.log(test.get("bee")); // should return null

console.log(test.has("bear")); // should return true
console.log(test.has("frog")); // should return false, 
// ^BUG: frog should be in hashmap but because of hashed key % capacity, the key "bear" replaces it.
// use better hash function?

console.log(test.length()); // should return 13

console.log(test.remove("bear")); // should return true and bear should be removed
test.toString();
console.log(test.remove("pepe")); // should return false

console.log(test.length()); // should return 12

test.clear();
test.toString(); // should be no key-value pairs
