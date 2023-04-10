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

    //tree report
    treeGraph() {
        nodes = "";
        connections = "";
        if (this.root == null) {
            return "\nnode[shape=none]\nn[label=\"Sin Alumnos\" fontname=\"calibri\"]\n";
        }
        this.treeGraphRecursive(this.root);
        return "\nnode[shape=box fontname=\"calibri\"];\n" + nodes + connections;
    }
    treeGraphRecursive(current) {
        if (current.left != null) {
            this.treeGraphRecursive(current.left);
            connections += `S_${current.value.carnet} -> S_${current.left.value.carnet};\n`;
        }
        nodes += `S_${current.value.carnet}[label="${current.value.carnet}\\n${current.value.nombre}\\nAltura: ${current.height}"];\n`
        if (current.right != null) {
            this.treeGraphRecursive(current.right);
            connections += `S_${current.value.carnet} -> S_${current.right.value.carnet};\n`;
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
                <td>${current.value.carnet}</td>
                <td>${current.value.nombre}</td>
                <td>${current.value.password}</td>
            </tr>
        `;
        if (current.right != null) {
            row += this.#inOrderRecursive(current.right);
        }
        return row;
    }

    //loop through in pre order
    preOrder() {
        if (this.root) {
            let html = this.#preOrderRecursive(this.root);
            return html;
        }
        return "";
    }
    #preOrderRecursive(current) {
        let row = "";
        row += `
                <tr>
                    <td>${current.value.carnet}</td>
                    <td>${current.value.nombre}</td>
                    <td>${current.value.password}</td>
                </tr>
            `;
        if (current.left != null) {
            row += this.#preOrderRecursive(current.left);
        }
        if (current.right != null) {
            row += this.#preOrderRecursive(current.right);
        }
        return row;
    }

    //loop through in post order
    postOrder() {
        if (this.root) {
            let html = this.#postOrderRecursive(this.root);
            return html;
        }
        return "";
    }
    #postOrderRecursive(current) {
        let row = "";
        if (current.left != null) {
            row += this.#postOrderRecursive(current.left);
        }
        if (current.right != null) {
            row += this.#postOrderRecursive(current.right);
        }
        row += `
                <tr>
                    <td>${current.value.carnet}</td>
                    <td>${current.value.nombre}</td>
                    <td>${current.value.password}</td>
                </tr>
            `;
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
            <option value="${current.value.carnet}">${current.value.carnet}</option>
        `;
        }
        if (current.right != null) {
            row += this.#showStudentsRecursive(current.right, carnet);
        }
        return row;
    }

}