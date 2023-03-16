class Node {
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

    insertToStart(value) {
        const node = new Node(value);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.tail.next = this.head;
    }

    insertToEnd(value) {
        const node = new Node(value);

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

    print() {
        let currentNode = this.head;

        while (currentNode) {
            console.log(currentNode.value);
            if (currentNode.next === this.head) {
                break;
            }
            currentNode = currentNode.next;
        }
    }

}

// Example usage:
const myList = new CircularLinkedList();
myList.addToStart(1);
myList.addToStart(2);
myList.addToStart(3);
myList.addToStart(4);
myList.addToStart(5);
myList.addToStart(6);
myList.addToStart(7);
myList.addToStart(8);
myList.addToStart(9);
myList.addToStart(10);
myList.addToEnd(0);

let n = myList.getValues();
let head = myList.getValues();
while (n) {
    console.log(n.value);
    if (n.next === head) {
        break;
    }
    n = n.next;
}

myList.delete(0);

console.log("-----------")

n = myList.getValues();
head = myList.getValues();
while (n) {
    console.log(n.value);
    if (n.next === head) {
        break;
    }
    n = n.next;
}