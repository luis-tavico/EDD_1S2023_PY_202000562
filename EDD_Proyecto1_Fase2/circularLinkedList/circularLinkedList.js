class CllNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insert(value) {
        const node = new CllNode(value);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }

        this.tail.next = this.head;
    }

    delete(value) {
        if (!this.head) {
            return;
        }

        if (this.head.value === value) {
            this.head = this.head.next;
            this.tail.next = this.head;
            return;
        }

        let currentNode = this.head;

        while (currentNode.next && currentNode.next.value !== value) {
            currentNode = currentNode.next;
        }

        if (currentNode.next === this.head) {
            this.tail = currentNode;
        }

        currentNode.next = currentNode.next.next;
        this.tail.next = this.head;
    }

    getValues() {
        return this.head;
    }

    graph() {
        var num = 1;
        let code = "digraph {\nsplines=ortho;\nnode[shape=box];\nnodesep=0.5;\nranksep=0.3;\n";
        let currentNode = this.head;
        let head = this.head;
        if (currentNode) {
            let nodes = "{rank=same; "
            code += "{head [width=0 shape=point style=invis];}\n";
            code += "{tail [width=0 shape=point style=invis];}\n";
            code += "{rank=same; head -> tail [arrowhead=none];}\n";
            while (currentNode) {
                if (currentNode.next === head) {
                    code += "N" + num + "[label=\"" + currentNode.value + "\"]\n";
                    nodes += "N" + num + ";}\n";
                    break;
                }
                code += "N" + num + "[label=\"" + currentNode.value + "\"]\n";
                nodes += "N" + num + "->";
                num += 1;
                currentNode = currentNode.next;
            }
            code += "head [group=g1]\nN1 [group=g1]\n"
            code += "tail [group=g" + num + "]\nN" + num + "[group=g" + num + "]\n"
            code += "{head -> N1}\n{N" + num + " -> tail [arrowhead=none];}\n"
            code += nodes;
        }
        code += "}"
        return code;
    }
}

/*let n = myList.getValues();
let head = myList.getValues();
while (n) {
    console.log(n.value);
    if (n.next === head) {
        break;
    }
    n = n.next;
}*/