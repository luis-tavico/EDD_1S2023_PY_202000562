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
    /////////////////////////////////////////
    currentUser = avlTree.searchNode(parseInt(userName));
    currentUser.value.acciones = newCircularList;
    currentUser.value.carpetas = tree;
    localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
    localStorage.setItem("avlN_ary", JSON.stringify(JSON.decycle(tree)));
    localStorage.setItem("sparseMatrix", JSON.stringify(JSON.decycle(sparseMatrix)));
    localStorage.setItem("circularLinkedList", JSON.stringify(JSON.decycle(newCircularList)));
    console.log("done")
    $('#folders').html(tree.getHTML(path))
}

function deleteFolder(e) {
    e.preventDefault();
    let folderName = $('#name_folder').val();
    let path = $('#path').val();
    loadFolderInList(path);
    tree.delete(folderName, path);
    newCircularList.insert(messageDeleteFolder(folderName));
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: '¡Carpeta eliminada exitosamente!',
        showConfirmButton: false,
        timer: 1000
    })
    //$('#folders').html(tree.getHTML(path))
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

function getInFolder(folderName) {
    let path = $('#path').val();
    let curretPath = path == '/' ? path + folderName : path + "/" + folderName;
    //console.log(curretPath)
    $('#path').val(curretPath);
    $('#folders').html(tree.getHTML(curretPath))
    //console.log(tree.getFilesMatrix(curretPath));
    sparseMatrix.head = tree.getFilesMatrix(curretPath).head;
    sparseMatrix.folderName = tree.getFilesMatrix(curretPath).folderName;
    localStorage.setItem("sparseMatrix", JSON.stringify(JSON.decycle(sparseMatrix)));
}

function backToStart() {
    sparseMatrix.head = tree.getFilesMatrix("/").head;
    sparseMatrix.folderName = tree.getFilesMatrix("/").folderName;
    localStorage.setItem("sparseMatrix", JSON.stringify(JSON.decycle(sparseMatrix)));
    $('#path').val("/");
    $('#folders').html(tree.getHTML("/"))
}

function showTreeGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G {${tree.graph()}}`
    //console.log(body);
    $("#graph").attr("src", url + body);
}

function showMatrixGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${sparseMatrix.graph()} }`
    $("#graphFiles").attr("src", url + body);
}

function showCircularGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = newCircularList.graph();
    $("#graphActions").attr("src", url + body);
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
    ///////
    let fileName = form.file.name;
    ///////
    let path = $('#path').val();
    ///////
    fileName = tree.verifyFile(fileName, path)
    console.log(fileName)
    ///////
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
    ///////////////////////////////////////////////////
    currentUser = avlTree.searchNode(parseInt(userName));
    currentUser.value.acciones = newCircularList;
    currentUser.value.carpetas = tree;
    localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
    localStorage.setItem("avlN_ary", JSON.stringify(JSON.decycle(tree)));
    localStorage.setItem("sparseMatrix", JSON.stringify(JSON.decycle(sparseMatrix)));
    localStorage.setItem("circularLinkedList", JSON.stringify(JSON.decycle(newCircularList)));
    console.log("done")
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: '¡Arhivo subido exitosamente!',
        showConfirmButton: false,
        timer: 1000
    })
}

function getLocalStudents() {
    let temp = localStorage.getItem("avlTree")
    if (temp != null) {
        avlTree.root = JSON.parse(temp).root;
    }
}

function getLocalFoldersAndFiles() {
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlN_ary")));
    tree.root = temp.root;
    tree.size = temp.size;
    let path = $('#path').val();
    $('#folders').html(tree.getHTML(path))
    sparseMatrix.head = tree.root.sparseMatrix.head;
    sparseMatrix.folderName = tree.root.sparseMatrix.folderName;
}

function getLocalCircularList() {
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("circularLinkedList")));
    cicularList.head = temp.head;
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

function loadStudentInList() {
    $('#users').html(
        "<option value=\"\" selected disabled>---</option>" + avlTree.showStudents()
    )
}

function loadFileInList() {
    let path = $('#path').val();
    $('#files').html(
        "<option value=\"\" selected disabled>---</option>" + tree.showFiles(path)
    )
}

function loadFolderInList() {
    let path = $('#path').val();
    $('#foldersInList').html(
        "<option value=\"\" selected disabled>---</option>" + tree.showFolders(path)
    )
}

function saveData() {
    currentUser = avlTree.searchNode(parseInt(userName));
    currentUser.value.acciones = newCircularList;
    currentUser.value.carpetas = tree;
    localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
    localStorage.setItem("avlN_ary", JSON.stringify(JSON.decycle(tree)));
    localStorage.setItem("sparseMatrix", JSON.stringify(JSON.decycle(sparseMatrix)));
    localStorage.setItem("circularLinkedList", JSON.stringify(JSON.decycle(newCircularList)));
    console.log("done")
}

function logout() {
    currentUser = avlTree.searchNode(parseInt(userName));
    currentUser.value.acciones = newCircularList;
    currentUser.value.carpetas = tree;
    localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
    localStorage.setItem("avlN_ary", JSON.stringify(JSON.decycle(tree)));
    localStorage.setItem("sparseMatrix", JSON.stringify(JSON.decycle(sparseMatrix)));
    localStorage.setItem("circularLinkedList", JSON.stringify(JSON.decycle(newCircularList)));
    console.log("done")
    location.href = "login.html";
    localStorage.removeItem('currentUser');
    localStorage.removeItem('avlN_ary');
    localStorage.removeItem('sparseMatrix');
    localStorage.removeItem('circularLinkedList')
}

$(document).ready(getLocalStudents);
$(document).ready(getLocalFoldersAndFiles);
$(document).ready(getLocalCircularList);
$(document).ready(loadStudentInList);
$(document).ready(loadFolderInList);
$(document).ready(loadFileInList);