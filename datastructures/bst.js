class Node {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    /* 
    takes an array and turns it into a balanced binary tree
    returns the root (assumes array only consists of integers)

    1) sort array 
    2) the root is the middle element in array
    3) the nodes for the left tree is to the left of middle element,
    likewise for nodes for the right tree
    4) divide and conquer
    */
    buildTree(array) {
        function dfs(left, right) {
            if (left >= right) {
                return;
            }

            let middle = Math.floor((left + right) / 2);
            let new_node = new Node(uniques[middle]);
            let left_node = dfs(left, middle);
            let right_node = dfs(middle + 1, right);
            new_node.left = left_node;
            new_node.right = right_node;

            return new_node;
        }

        if (array.length == 0) {
            return null;
        }

        let uniques = [...new Set(array)];

        uniques.sort(function (a, b) {
            return a - b;
        });

        return dfs(0, uniques.length);
    }

    prettyPrint(node, prefix="", isLeft=true) {
        if (!node) {
            return;
        }
        
        if (node.right) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        
        if (node.left) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
}

let test = new Tree();
let root = test.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// expected:
// [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
//                  8
//         4                67
//      3      7         23      6345
//     1     5        9         324
test.prettyPrint(root);
