let avlTree = new AvlTree();
let tree = new Tree();
let sparseMatrix = new SparseMatrix("/");
let cicularList = new CircularLinkedList();
let newCircularList = new CircularLinkedList();
var userName = localStorage.getItem('currentUser');
document.querySelector(".userName").textContent = userName;

function createFolder(e) {
    e.preventDefault();
    let folderName = $('#folderName').val();
    let path = $('#path').val();
    folderName = tree.verifyFolder(folderName, path);
    console.log(folderName);
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
    loadFolderInList();
    document.getElementById('folderName').value = '';
    saveData();
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
    loadFolderInList();
    document.getElementById('foldersInList').value = "";
    saveData();
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
    console.log(fileName)
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
    loadFileInList();
    document.getElementById('file').value = '';
    saveData();
}

function createPermission(e) {
    e.preventDefault();
    let userSelected = $('#users').val();
    let fileSelected = $('#files').val();
    let permissionSelected = $('#permissions').val();
    sparseMatrix.insert(fileSelected, userSelected, permissionSelected);
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
    //console.log(curretPath)
    $('#path').val(curretPath);
    $('#folders').html(tree.getHTML(curretPath))
    sparseMatrix.head = tree.getFilesMatrix(curretPath).head;
    sparseMatrix.folderName = tree.getFilesMatrix(curretPath).folderName;
    loadFolderInList();
    loadFileInList();
}

function backToStart() {
    $('#path').val("/");
    $('#folders').html(tree.getHTML("/"))
    sparseMatrix.head = tree.getFilesMatrix("/").head;
    sparseMatrix.folderName = tree.getFilesMatrix("/").folderName;
    loadFolderInList();
    loadFileInList();
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
    //console.log(body);
    $("#graph").attr("src", url + body);
}

function showMatrixGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${sparseMatrix.graph()}}`
    let path = $('#path').val();
    console.log(tree.files(path));
    console.log(body);
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
    console.log(body)
    $("#graphActions").attr("src", url + body);
}

function getData() {
    let temp = localStorage.getItem("avlTree")
    if (temp != null) {
        avlTree.root = JSON.parse(temp).root;
        currentUser = avlTree.searchNode(parseInt(userName));
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
        tree.root = currentUser.value.carpetas.root;
        tree.size = currentUser.value.carpetas.size;
        let path = $('#path').val();
        $('#folders').html(tree.getHTML(path))
        sparseMatrix.head = tree.root.sparseMatrix.head;
        sparseMatrix.folderName = tree.root.sparseMatrix.folderName;

    }
}

function saveData() {
    currentUser = avlTree.searchNode(parseInt(userName));
    currentUser.value.acciones = newCircularList;
    currentUser.value.carpetas = tree;
    localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
    console.log("done")
}

function logout() {
    saveData();
    location.href = "login.html";
    localStorage.removeItem('currentUser');
    localStorage.removeItem('circularLinkedList')
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

$(document).ready(getData);
$(document).ready(loadStudentInList);
$(document).ready(loadFolderInList);
$(document).ready(loadFileInList);