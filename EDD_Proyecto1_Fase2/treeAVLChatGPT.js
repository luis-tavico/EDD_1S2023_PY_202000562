class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node === null ? 0 : node.height;
  }

  getBalance(node) {
    return node === null ? 0 : this.getHeight(node.left) - this.getHeight(node.right);
  }

  rotateRight(node) {
    const left = node.left;
    const rightOfLeft = left.right;

    left.right = node;
    node.left = rightOfLeft;

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    left.height = Math.max(this.getHeight(left.left), this.getHeight(left.right)) + 1;

    return left;
  }

  rotateLeft(node) {
    const right = node.right;
    const leftOfRight = right.left;

    right.left = node;
    node.right = leftOfRight;

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    right.height = Math.max(this.getHeight(right.left), this.getHeight(right.right)) + 1;

    return right;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const stack = [];
    let node = this.root;

    while (node !== null) {
      stack.push(node);

      if (value < node.value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    node = stack.pop();

    if (value < node.value) {
      node.left = newNode;
    } else {
      node.right = newNode;
    }

    while (stack.length > 0) {
      node = stack.pop();

      node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

      const balance = this.getBalance(node);

      if (balance > 1 && value < node.left.value) {
        node = this.rotateRight(node);
      } else if (balance < -1 && value > node.right.value) {
        node = this.rotateLeft(node);
      } else if (balance > 1 && value > node.left.value) {
        node.left = this.rotateLeft(node.left);
        node = this.rotateRight(node);
      } else if (balance < -1 && value < node.right.value) {
        node.right = this.rotateRight(node.right);
        node = this.rotateLeft(node);
      }
    }

    this.root = node;
  }

  find(value) {
    let node = this.root;

    while (node !== null) {
      if (value === node.value) {
        return node;
      } else if (value < node.value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    return null;
  }
}

// Example usage:
const myTree = new AVLTree();
myTree.insert(10);
myTree.insert(20);
myTree.insert(30);
myTree.insert(40);
myTree.insert(50);
myTree.insert(25);
console.log(myTree.find(30));
console.log(myTree.find(50));
console.log(myTree.find(35));

console.log(myTree);
