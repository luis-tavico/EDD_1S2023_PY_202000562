let avlTree = new AvlTree();
let tree = new Tree();
let sparseMatrix = new SparseMatrix("/");
let cicularList = new CircularLinkedList();
let newCircularList = new CircularLinkedList();
var userName = JSON.parse(localStorage.getItem('currentUser')).carnet;
document.querySelector(".userName").textContent = userName;
var nameUser = JSON.parse(localStorage.getItem('currentUser')).nombre;
document.querySelector("#transmitter").textContent = nameUser;

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

function loadStudentInList() {
    $('#receiver').html(
        "<option value=\"\" selected disabled>---</option>" + avlTree.showStudents(parseInt(userName))
    )
}

let blockChain = new BlockChain();

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

function getBlock(index) {
    if (index === 0) {
        let html = blockChain.blockReport(index);
        if (html) {
            $('.show-block').html(html);
        }
    } else {
        let currentBlock = Number($('#block-table').attr('name'));

        if (index < 0) {
            if (currentBlock - 1 < 0) {
                alert("No existen elementos anteriores");
            } else {
                let html = blockChain.blockReport(currentBlock - 1);
                if (html) {
                    $('.show-block').html(html);
                }
            }

        } else if (index > 0) {
            if (currentBlock + 1 > blockChain.size) {
                alert("No existen elementos siguientes");
            } else {
                let html = blockChain.blockReport(currentBlock + 1);
                if (html) {
                    $('.show-block').html(html);
                }
            }
        }
    }
}

$(document).ready(getData);
$(document).ready(loadStudentInList);