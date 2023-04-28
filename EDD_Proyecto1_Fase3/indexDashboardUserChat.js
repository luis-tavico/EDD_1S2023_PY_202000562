let avlTree = new AvlTree();
let tree = new Tree();
let cicularList = new CircularLinkedList();
let newCircularList = new CircularLinkedList();
let blockChain = new BlockChain();
var userName = JSON.parse(localStorage.getItem('currentUser')).carnet;
document.querySelector(".userName").textContent = userName;
var nameUser = JSON.parse(localStorage.getItem('currentUser')).nombre;
document.querySelector("#transmitter").textContent = nameUser;

function back() {
    location.href = "dashboardUser.html";
    localStorage.setItem("blockChain", JSON.stringify(JSON.decycle(blockChain)));
}

function getData() {
    let temp = localStorage.getItem("avlTree")
    if (temp != null) {
        avlTree.root = JSON.parse(temp).root;
        let currentUser = avlTree.searchNode(parseInt(userName));
        tree.root = currentUser.value.carpetas.root;
        tree.size = currentUser.value.carpetas.size;
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
    if (localStorage.getItem("blockChain") != null) {
        let tempBC = JSON.retrocycle(JSON.parse(localStorage.getItem("blockChain")));
        blockChain.head = tempBC.head;
        blockChain.end = tempBC.end;
        blockChain.size = tempBC.size;
    }
}

function loadStudentInList() {
    $('#receiver').html(
        "<option value=\"\" selected disabled>---</option>" + avlTree.showStudents(parseInt(userName))
    )
}

function updateChats() {
    let transmitter = parseInt(userName);
    let receiver = $('#receiver').val();
    $('.areaChatTransmitter').html(blockChain.getMessages(transmitter, receiver));
    $('.areaChatReceiver').html(blockChain.getMessages(receiver, transmitter));
}

async function sendMessage(whoSend) {
    let transmitter = parseInt(userName);
    let receiver = $('#receiver').val();

    if (transmitter && receiver) {
        switch (whoSend) {
            case 'transmitter':
                let msgt = $('.msg-transmitter').val();
                await blockChain.insert(transmitter, receiver, msgt);
                $('.msg-transmitter').val("");
                break;
            case 'receiver':
                let msgr = $('.msg-receiver').val();
                await blockChain.insert(receiver, transmitter, msgr);
                $('.msg-receiver').val("");
                break;
        }
        updateChats();
    } else {
        Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: '¡No ha seleccionado receptor!',
            showConfirmButton: false,
            timer: 1000
        })
    }
}

$(document).ready(getData);
$(document).ready(loadStudentInList);