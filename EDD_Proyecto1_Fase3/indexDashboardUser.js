let avlTree = new AvlTree();
let tree = new Tree();
let cicularList = new CircularLinkedList();
let newCircularList = new CircularLinkedList();
var userName = localStorage.getItem('currentUser');
document.querySelector(".userName").textContent = userName;
var name_folder = "/";

function createFolder(e) {
    e.preventDefault();
    let folderName = $('#folderName').val();
    let path = $('#path').val();
    folderName = tree.verifyFolder(folderName, path);
    tree.insert(folderName, path);
    newCircularList.insert(messageCreateFolder(folderName));
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: '¡Carpeta creada exitosamente!',
        showConfirmButton: false,
        timer: 1000
    })
    $('#folders').html(tree.getHTML(path));
    document.getElementById('folderName').value = '';
}

function deleteFolder(e) {
    e.preventDefault();
    let folderName = $('#foldersInList').val();
    let path = $('#path').val();
    tree.delete(folderName, path);
    newCircularList.insert(messageDeleteFolder(folderName));
    $('#folders').html(tree.getHTML(path))
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: '¡Carpeta eliminada exitosamente!',
        showConfirmButton: false,
        timer: 1000
    })
    document.getElementById('foldersInList').value = "";
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let fileName = form.file.name;
    let path = $('#path').val();
    fileName = tree.verifyFile(fileName, path)
    if (form.file.type === 'text/plain') {
        let fr = new FileReader();
        fr.readAsText(form.file);
        fr.onload = () => {
            tree.getFolder(path).files.push({
                name: fileName,
                content: fr.result,
                type: form.file.type
            })
            $('#folders').html(tree.getHTML(path));
        };
    } else {
        let parseBase64 = await toBase64(form.file);
        tree.getFolder(path).files.push({
            name: fileName,
            content: parseBase64,
            type: form.file.type
        })
        $('#folders').html(tree.getHTML(path));
    }
    newCircularList.insert(messageCreateFile(fileName));
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: '¡Arhivo subido exitosamente!',
        showConfirmButton: false,
        timer: 1000
    })
    document.getElementById('file').value = '';
}

function createPermission(e) {
    e.preventDefault();
    let userSelected = $('#users').val();
    let fileSelected = $('#files').val();
    let permissionSelected = $('#permissions').val();
    let path = $('#path').val();
    let sparseMatrix = new SparseMatrix(name_folder);
    sparseMatrix.head = tree.getFilesMatrix(path).head;
    sparseMatrix.insert(fileSelected, userSelected, permissionSelected);
    tree.setFilesMatrix(path, sparseMatrix);
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: '¡Permiso otorgado exitosamente!',
        showConfirmButton: false,
        timer: 1000
    })
    document.getElementById('users').value = "";
    document.getElementById('files').value = "";
    document.getElementById('permissions').value = "";
}

function getInFolder(folderName) {
    let path = $('#path').val();
    let curretPath = path == '/' ? path + folderName : path + "/" + folderName;
    $('#path').val(curretPath);
    $('#folders').html(tree.getHTML(curretPath));
    name_folder = folderName;
}

function backToStart() {
    $('#path').val("/");
    $('#folders').html(tree.getHTML("/"));
    name_folder = "/";
}

function messageCreateFolder(folderName) {
    var today = new Date();
    var action = "Carpeta \\\"" + folderName + "\\\" creada\\nFecha: " + today.toLocaleDateString('es-US') + "\\nHora: " + today.toLocaleTimeString('en-US');
    return action;
}

function messageDeleteFolder(fileName) {
    var today = new Date();
    var action = "Carpeta \\\"" + fileName + "\\\" eliminada\\nFecha: " + today.toLocaleDateString('es-US') + "\\nHora: " + today.toLocaleTimeString('en-US');
    return action;
}

function messageCreateFile(fileName) {
    var today = new Date();
    var action = "Archivo \\\"" + fileName + "\\\" creado\\nFecha: " + today.toLocaleDateString('es-US') + "\\nHora: " + today.toLocaleTimeString('en-US');
    return action;
}

function showTreeGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G {${tree.graph()}}`
    $("#graph").attr("src", url + body);
}

function showMatrixGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let path = $('#path').val();
    let spsMatrix = new SparseMatrix(name_folder);
    spsMatrix.head = tree.getFilesMatrix(path).head;
    spsMatrix.printX();
    spsMatrix.printY();
    let body = `digraph G { ${spsMatrix.graph()}}`;
    if (tree.files(path) < 1) {
        body = "digraph G {\nnode[shape=none]\nn[label=\"No se pudo crear la matriz por falta de archivos.\" fontname=\"calibri\"]\n}"
        $("#graphFiles").attr("src", url + body);
    } else {
        $("#graphFiles").attr("src", url + body);
    }
}

function showCircularGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = newCircularList.graph();
    $("#graphActions").attr("src", url + body);
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
        let path = $('#path').val();
        $('#folders').html(tree.getHTML(path))
    }
}

function saveData() {
    let currentUser = avlTree.searchNode(parseInt(userName));
    currentUser.value.acciones = newCircularList;
    currentUser.value.carpetas = tree;
    localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
}

function logout() {
    saveData();
    location.href = "login.html";
    localStorage.removeItem('currentUser');
    localStorage.removeItem('treeNary');
    localStorage.removeItem('circularLinkedList')
}

function chat() {
    saveData();
    location.href = "chat.html";
    //localStorage.removeItem('currentUser');
    //localStorage.removeItem('treeNary');
    //localStorage.removeItem('circularLinkedList')
}

function loadStudentInList() {
    $('#users').html(
        "<option value=\"\" selected disabled>---</option>" + avlTree.showStudents(parseInt(userName))
    )
}

function loadFolderInList() {
    let path = $('#path').val();
    $('#foldersInList').html(
        "<option value=\"\" selected disabled>---</option>" + tree.showFolders(path)
    )
}

function loadFileInList() {
    let path = $('#path').val();
    $('#files').html(
        "<option value=\"\" selected disabled>---</option>" + tree.showFiles(path)
    )
}

function sharedWithMe(val) {
    console.log(val)
    document.getElementById('btnCreateFolder').disabled = true
    document.getElementById('btnDeleteFolder').disabled = true;
    document.getElementById('btnShareFile').disabled = true;
    document.getElementById('btnUploadFile').disabled = true;
    document.getElementById('btnBackToStart').disabled = true;
}

function myUnit(val) {
    console.log(val)
    document.getElementById('btnCreateFolder').disabled = false;
    document.getElementById('btnDeleteFolder').disabled = false;
    document.getElementById('btnShareFile').disabled = false;
    document.getElementById('btnUploadFile').disabled = false;
    document.getElementById('btnBackToStart').disabled = false;
}

$(document).ready(getData);
$(document).ready(loadStudentInList);