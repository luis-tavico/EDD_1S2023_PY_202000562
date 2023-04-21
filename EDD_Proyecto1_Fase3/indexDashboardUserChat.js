let avlTree = new AvlTree();
let tree = new Tree();
let sparseMatrix = new SparseMatrix("/");
let cicularList = new CircularLinkedList();
let newCircularList = new CircularLinkedList();
var userName = localStorage.getItem('currentUser');
document.querySelector(".userName").textContent = userName;

function print(e) {
    e.preventDefault();
    let message = $('#areaMessage').val();
    $('#areaChat').html(
        `
        <div class="chatContainer darker text-white ps-4 pe-2">
        <img src="/images/avatar.png" alt="Avatar" class="right">
        <p class="mb-3">${message}</p>
        <span class="time-left">11:01 PM</span>
        </div>
        `  
    )
}

function back() {
    location.href = "dashboardUser.html";
}

function getData() {
    let temp = localStorage.getItem("avlTree")
    if (temp != null) {
        avlTree.root = JSON.parse(temp).root;
        let currentUser = avlTree.searchNode(parseInt(userName));
        tree.root = currentUser.value.carpetas.root;
        tree.size = currentUser.value.carpetas.size;
        sparseMatrix.head = tree.root.sparseMatrix.head;
        sparseMatrix.folderName = tree.root.sparseMatrix.folderName;
        let circular = JSON.retrocycle(JSON.parse(localStorage.getItem("circularLinkedList")));
        cicularList.head = circular.head;
        let n = cicularList.getValues();
        let head = cicularList.getValues();
        while (n) {
            newCircularList.append(n.value);
            if (n.next == head) {
                break;
            }
            n = n.next;
        }
    }
}

function loadStudentInListChat() {
    $('#usersChat').html(
        avlTree.showStudentsChat(parseInt(userName))
    )
}

$(document).ready(getData);
$(document).ready(loadStudentInListChat);