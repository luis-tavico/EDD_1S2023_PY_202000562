class MNode {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;

        //pointer
        this.up = null;
        this.down = null;
        this.right = null;
        this.left = null;
    }
}

class SparseMatrix {
    constructor() {
        this.head = new MNode(-1, -1, "Inicio");
    }

    insert(x, y, value) {
        this.#xHeaders(x);
        this.#yHeaders(y);
        const node = new MNode(x, y, value);
        this.#addX(node, x);
        this.#addY(node, y);
    }

    #xHeaders(x) {
        const curr = new MNode(-1, -1, x);
        if (this.head.down == null) {
            this.head.down = curr;
            curr.up = this.head;
        } else {
            let temp = this.head;

            while (temp.down != null && temp.down.value < x) {
                temp = temp.down;
            }

            if (temp.down == null) {
                temp.down = curr;
                curr.up = temp;
            } else if (temp.down != null && temp.down.value != x) {
                let r = temp.down;
                temp.down = curr;
                curr.up = temp;
                curr.down = r;
                r.up = curr;
            }
        }
    }

    #yHeaders(y) {
        const curr = new MNode(-1, -1, y);
        if (this.head.right == null) {
            this.head.right == curr;
            curr.left = this.head;
        } else {
            let temp = this.head;

            while (temp.right != null && temp.right.value < y) {
                temp = temp.right;
            }

            if (temp.right == null) {
                temp.right = curr;
                curr.left = temp;
            } else if (temp.right != null && temp.right.value != y) {
                let r = temp.right;
                temp.right = curr;
                curr.left = temp;
                curr.right = r;
                r.left = curr;
            }
        }
    }

    #addX(newNode, x) {
        let temp = this.head;

        while (temp.value != x) {
            temp = temp.down;
        }

        if (temp.right == null) {
            temp.right = newNode;
            newNode.left = temp;
        } else {
            let curr = temp.right;

            if (curr.y >= newNode.y) {
                newNode.right = curr;
                newNode.right.left = newNode;

                newNode.left = temp;
                temp.right = newNode;

                curr = newNode;
            } else {
                while (curr.right != null && curr.right.y < newNode.y) {
                    curr = curr.right;
                }
                newNode.right = curr.right;
                if (curr.right != null) {
                    newNode.right.left = newNode;
                }
                curr.right = newNode;
                newNode.left = curr;
            }
        }
    }

    #addY(newNode, y) {
        let temp = this.head;

        while (temp.value != y) {
            temp = temp.right;
        }

        if (temp.down == null) {
            temp.down = newNode;
            newNode.up = temp;
        } else {
            let curr = temp.down;

            if (curr.x >= newNode.x) {
                newNode.down = curr;
                newNode.down.up = newNode;

                newNode.up = temp;
                temp.down = newNode;

                curr = newNode;
            } else {
                while (curr.down != null && curr.down.y < newNode.y) {
                    curr = curr.down;
                }
                newNode.down = curr.down;
                if (curr.down != null) {
                    newNode.down.up = newNode;
                }
                curr.down = newNode;
                newNode.up = curr;
            }

        }

    }

    printX() {
        let tx = null;
        try { tx = this.head.down } catch (error) { tx = null; console.log("erronX1"); }
        let ty = null;

        while (tx != null) {
            try { ty = tx.right } catch (error) { ty = null; console.log("errorX2"); }
            let str = ""
            while (ty != null) {
                str += ty.value + ",";
                ty = ty.right;
            }
            console.log(tx.value, ": ", str)
            tx = tx.down;
        }
    }

    printY() {
        let ty = null;
        try { ty = this.head.right } catch (error) { ty = null; console.log("errorY1"); }
        let tx = null;
        while (ty != null) {
            try { tx = ty.down } catch (error) { tx = null; console.log("errorY2"); }
            let str = ""
            while (tx != null) {
                str += tx.value + ",";
                tx = tx.down;
            }
            console.log(ty.value, ": ", str)
            ty = ty.right;
        }
    }

}

module.exports = SparseMatrix;