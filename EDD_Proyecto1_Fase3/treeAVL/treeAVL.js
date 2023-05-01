class AvlNode {
    constructor(value) {
        this.value = value;
        this.left = undefined;
        this.right = undefined;
        this.height = 0;
    }

    insert(value) {
        if (value.carnet < this.value.carnet) {
            if (this.left) {
                this.left.insert(value);
                let height = this.updateHeight();
                if (height > 2) {
                    let nodeLeft = this.rotate(this.left);
                    if (nodeLeft) {
                        this.left = nodeLeft;
                    }
                }
            } else {
                this.left = new AvlNode(value);
            }
        } else if (value.carnet > this.value.carnet) {
            if (this.right) {
                this.right.insert(value);
                let height = this.updateHeight();
                if (height > 2) {
                    let nodeRight = this.rotate(this.right);
                    if (nodeRight) {
                        this.right = nodeRight;
                    }
                }
            } else {
                this.right = new AvlNode(value);
            }
        }
        return undefined;
    }

    updateHeight() {
        let heightLeft = this.left ? this.left.updateHeight() : -1;
        let heightRight = this.right ? this.right.updateHeight() : -1;

        this.height = Math.max(heightLeft, heightRight) + 1;
        return this.height;
    }

    //rotations
    rotate(node) {
        if (node.left && node.left.height >= 1) {
            if (!node.right) {
                if (node.left.left) {
                    let newNode = node.left;
                    newNode.right = node;
                    node.left = undefined;
                    return newNode;
                } else if (node.left.right) {
                    let newNode = node.left.right;
                    node.left.right = undefined;
                    newNode.left = node.left;
                    newNode.right = node;
                    node.left = undefined;
                    return newNode;
                }
            } else if (node.left.height > node.right.height && node.left.height - node.right.height > 1) {
                let newNode = node.left;
                node.left = newNode.right;
                newNode.right = node;
                return newNode;
            }
        }

        if (node.right && node.right.height >= 1) {
            if (!node.left) {
                if (node.right.right) {
                    let newNode = node.right;
                    newNode.left = node;
                    node.right = undefined;
                    return newNode;
                } else if (node.right.left) {
                    let newNode = node.right.left;
                    node.right.left = undefined;
                    newNode.right = node.right;
                    newNode.left = node;
                    node.right = undefined;
                    return newNode;
                }
            } else if (node.right.height > node.left.height && node.right.height - node.left.height > 1) {
                let newNode = node.right;
                node.right = newNode.left;
                newNode.left = node;
                return newNode;
            }
        }
        return undefined;
    }
}

let = nodes = "";
let = connections = "";

class AvlTree {
    constructor() {
        this.root = undefined;
    }

    insert(value) {
        if (this.root) {
            this.root.insert(value);
            let height = this.root.updateHeight();
            if (height > 1) {
                let newNode = this.root.rotate(this.root);
                if (newNode) {
                    this.root = newNode;
                }
            }
        } else {
            this.root = new AvlNode(value);
        }
    }

    //search node
    searchNode(carnet) {
        return this.#searchNodeRecursive(this.root, carnet);
    }
    #searchNodeRecursive(current, carnet) {
        if (!current) return null;

        if (current.value.carnet === carnet) return current;

        if (carnet < current.value.carnet) {
            return this.#searchNodeRecursive(current.left, carnet);
        } else {
            return this.#searchNodeRecursive(current.right, carnet);
        }
    }

    //loop through in order
    inOrderList() {
        let row = [];
        if (this.root) {
            let html = this.#inOrderRecursiveList(this.root, row);
            return html;
        }
        return row;
    }
    #inOrderRecursiveList(current, row) {
        if (current.left != null) {
            this.#inOrderRecursiveList(current.left, row);
        }
        row.push(current.value)
        if (current.right != null) {
            this.#inOrderRecursiveList(current.right, row);
        }
        return row;
    }

    //loop through in order
    inOrder() {
        if (this.root) {
            let html = this.#inOrderRecursive(this.root);
            return html;
        }
        return "";
    }
    #inOrderRecursive(current) {
        let row = "";
        if (current.left != null) {
            row += this.#inOrderRecursive(current.left);
        }
        row += `
                <tr>
                    <td class="col-3">${current.value.carnet}</td>
                    <td class="col-4">${current.value.nombre}</td>
                    <td class="col-5">${current.value.password}</td>
                </tr>
            `;
        if (current.right != null) {
            row += this.#inOrderRecursive(current.right);
        }
        return row;
    }

    //show Students
    showStudents(carnet) {
        if (this.root) {
            let html = this.#showStudentsRecursive(this.root, carnet);
            return html;
        }
        return "";
    }
    #showStudentsRecursive(current, carnet) {
        let row = "";
        if (current.left != null) {
            row += this.#showStudentsRecursive(current.left, carnet);
        }
        if (current.value.carnet != carnet) {
            row += `
            <option value="${current.value.carnet}">${current.value.nombre}</option>
        `;
        }
        if (current.right != null) {
            row += this.#showStudentsRecursive(current.right, carnet);
        }
        return row;
    }

    //show Students in Chat
    showStudentsChat(carnet) {
        if (this.root) {
            let html = this.#showStudentsChatRecursive(this.root, carnet);
            return html;
        }
        return "";
    }
    #showStudentsChatRecursive(current, carnet) {
        let row = "";
        if (current.left != null) {
            row += this.#showStudentsChatRecursive(current.left, carnet);
        }
        if (current.value.carnet != carnet) {
            row += `
            <button onclick="receiverSelected(this.id)" type="button" id="${current.value.nombre}" value="${current.value.carnet}"
            class="rounded-0 border-0 border-bottom border-secondary-subtle list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div class="ms-2 me-auto">
                <div class="fw-bold">${current.value.nombre}</div>
                ${current.value.carnet}
            </div>
            </button>
        `;
        }
        if (current.right != null) {
            row += this.#showStudentsChatRecursive(current.right, carnet);
        }
        return row;
    }

}