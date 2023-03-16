class TNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class TreeAVL {
    constructor() {
        this.root = null;
    }

    add(value) {
        const newNode = new TNode(value);
        if (this.root == null) {
            this.root = newNode;
        } else {
            this.#recursive(this.root, newNode)
        }
    }

    #recursive(curr, temp) {
        if (curr.value < temp.value) {
            if (curr.left != null) {
                this.#recursive(curr.left, temp);
            } else {
                curr.left = temp;
            }
        } else if (curr.value > temp.value) {
            if (curr.right != null) {
                this.#recursive(curr.right, temp);
            } else {
                curr.right = temp;
            }
        } else {
            console.log("El valor ya esta en el arbol");
        }
    }
}

module.exports = TreeAVL;