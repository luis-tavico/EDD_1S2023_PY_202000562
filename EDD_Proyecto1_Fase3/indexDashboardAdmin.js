let avlTree = new AvlTree();
let tableHash = new HashTable();
let blockChain = new BlockChain();
let linkedList = new LinkedList();

function loadStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
    try {
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {
            studentsArray = JSON.parse(fr.result).alumnos;
            for (let i = 0; i < studentsArray.length; i++) {
                let actions = new CircularLinkedList();
                let folders = new Tree();
                password = encrypt_data(studentsArray[i].password);
                let student = new Student(studentsArray[i].nombre, studentsArray[i].carnet, password, "/", folders, actions);
                avlTree.insert(student);
            }
            stds = avlTree.inOrderList();
            stds.forEach(student => tableHash.insert(student));
            $('#studentsTable tbody').html(
                avlTree.inOrder()
            )
            localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
            Swal.fire({
                position: 'bottom-end',
                icon: 'success',
                title: '¡Estudiantes Agregados Exitosamente!',
                showConfirmButton: false,
                timer: 1000
            })
            document.getElementById('inputFile').value = '';
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: '¡Estudiantes No Agregados!',
            showConfirmButton: false,
            timer: 1000
        })
    }
}

function orderTableHash() {
    stds = avlTree.inOrderList();
    stds.forEach(student => tableHash.insert(student));
    $('#studentsTable tbody').html(
        tableHash.print()
    )
}

function getData() {
    if (localStorage.getItem("avlTree") != null) {
        let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
        avlTree.root = temp.root;
        /*stds = avlTree.inOrderList();
        stds.forEach(student => tableHash.insert(student));
        $('#studentsTable tbody').html(
            tableHash.print()
        )*/
    }
    $('#studentsTable tbody').html(
        avlTree.inOrder()
    )
    if (localStorage.getItem("blockChain") != null) {
        let tempBC = JSON.retrocycle(JSON.parse(localStorage.getItem("blockChain")));
        blockChain.head = tempBC.head;
        blockChain.end = tempBC.end;
        blockChain.size = tempBC.size;
    }
    if (localStorage.getItem("linkedList") != null) {
        let templl = JSON.retrocycle(JSON.parse(localStorage.getItem("linkedList")));
        linkedList.head = templl.head;
        linkedList.length = templl.length;
    }
    $('#permissionsTable tbody').html(
        linkedList.values()
    )
}

function encrypt_data(string) {
    string = unescape(encodeURIComponent(string));
    var newString = '',
        char, nextChar, combinedCharCode;
    for (var i = 0; i < string.length; i += 2) {
        char = string.charCodeAt(i);
        if ((i + 1) < string.length) {
            nextChar = string.charCodeAt(i + 1) - 31;
            combinedCharCode = char + "" + nextChar.toLocaleString('en', {
                minimumIntegerDigits: 2
            });
            newString += String.fromCharCode(parseInt(combinedCharCode, 10));
        } else {
            newString += string.charAt(i);
        }
    }
    return newString.split("").reduce((hex, c) => hex += c.charCodeAt(0).toString(16).padStart(4, "0"), "");
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

function showMessagesGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = "digraph {\n splines=ortho;\n node[shape=box fontname=\"calibri\"];\n edge[arrowsize=0.7];\n ranksep=0.4;\n";
    let num = 0;
    while (num < blockChain.size) {
        body += blockChain.graph(num);
        num += 1;
    }
    let n = 0;
    while (num > 1) {
        body += `n_${n} -> n_${n + 1};\n`;
        n += 1;
        num -= 1;
    }
    body += "}"
    $("#graphMessages").attr("src", url + body);
}

function logout() {
    location.href = "login.html";
    localStorage.setItem("blockChain", JSON.stringify(JSON.decycle(blockChain)));
    localStorage.setItem("linkedList", JSON.stringify(JSON.decycle(linkedList)));
}

$(document).ready(getData);