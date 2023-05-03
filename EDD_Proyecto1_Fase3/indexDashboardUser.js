let avlTree = new AvlTree();
let tree = new Tree();
let cicularList = new CircularLinkedList();
let newCircularList = new CircularLinkedList();
let linkedList = new LinkedList();
var userName = JSON.parse(localStorage.getItem('currentUser')).carnet;
document.querySelector(".userName").textContent = JSON.parse(localStorage.getItem('currentUser')).nombre;
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
            tree.getFolder(path).node.files.push({
                name: fileName,
                content: fr.result,
                type: form.file.type
            })
            $('#folders').html(tree.getHTML(path));
        };
    } else {
        let parseBase64 = await toBase64(form.file);
        tree.getFolder(path).node.files.push({
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
    let selectedUser = avlTree.searchNode(parseInt(userSelected));
    file = tree.getFolder(path).node.files.find(file => file.name == fileSelected);
    let fileName = file.name;
    if (selectedUser.value.compartidoConmigo.find(fil => fil.name === fileName)) {
        let i = 1;
        while (selectedUser.value.compartidoConmigo.find(fil => fil.name === fileName.split(".")[0] + "(" + i + ")." + fileName.split(".")[1])) {
            i += 1;
        }
        fileName = fileName.split(".")[0] + "(" + i + ")." + fileName.split(".")[1]
    }
    selectedUser.value.compartidoConmigo.push({
        name: fileName,
        content: file.content,
        type: file.type,
        permission: permissionSelected
    })
    var permission = new Object();
    permission.owner = userName;
    permission.receiver = userSelected;
    permission.location = path;
    permission.file = { name: fileName, content: file.content, type: file.type }
    permission.type = permissionSelected;
    linkedList.insert(permission);
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

function showContentPdf(content, name) {
    htmlPDF = `<iframe src=${content} title="description"></iframe>`;
    let nameFile = name.split('.');
    document.querySelector("#modalContentFileLabel").textContent = nameFile[0];
    $('.content').html(htmlPDF);
    $('#modalContentFile').modal('show');
}

function showContentIMG(content, name) {
    htmlIMG = `<img src=${content} alt="img"></img>`
    let nameFile = name.split('.');
    document.querySelector("#modalContentFileLabel").textContent = nameFile[0];
    $('.content').html(htmlIMG);
    $('#modalContentFile').modal('show');
}

function edit() {
    document.getElementById("areaText").readOnly = false;
}

function edited() {
    let fileName = document.getElementById("modalContentFileTXTLabel").textContent;
    fileName += ".txt";
    let content = document.getElementById("areaText").value;
    let usr = avlTree.searchNode(parseInt(userName));
    for (let i = 0; i < usr.value.compartidoConmigo.length; i++) {
        if (usr.value.compartidoConmigo[i].name == fileName) {
            usr.value.compartidoConmigo[i].content = content;
            break;
        }
    }
    sharedWithMe();
}

function showContentTXT(content, name, permission) {
    htmlTXT = `<textarea id="areaText" rows="10" cols="100" readonly>${content}</textarea>`
    let nameFile = name.split('.');
    document.querySelector("#modalContentFileTXTLabel").textContent = nameFile[0];
    $('.contentTXT').html(htmlTXT);
    if (permission == "r_w" || permission == "w") {
        document.getElementById('btnEdit').style.visibility = 'visible';
    } else {
        document.getElementById('btnEdit').style.visibility = 'hidden';
    }
    $('#modalContentFileTXT').modal('show');
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
    if (localStorage.getItem("linkedList") != null) {
        let templl = JSON.retrocycle(JSON.parse(localStorage.getItem("linkedList")));
        linkedList.head = templl.head;
        linkedList.length = templl.length;
    }
}

function saveData() {
    let currentUser = avlTree.searchNode(parseInt(userName));
    currentUser.value.acciones = newCircularList;
    currentUser.value.carpetas = tree;
    localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
    localStorage.setItem("linkedList", JSON.stringify(JSON.decycle(linkedList)));
}

function logout() {
    saveData();
    location.href = "login.html";
    localStorage.removeItem('currentUser');
    localStorage.removeItem('circularLinkedList')
}

function chat() {
    localStorage.setItem("circularLinkedList", JSON.stringify(JSON.decycle(newCircularList)));
    saveData();
    location.href = "chat.html";
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

function sharedWithMe() {
    document.getElementById('btnCreateFolder').disabled = true
    document.getElementById('btnDeleteFolder').disabled = true;
    document.getElementById('btnShareFile').disabled = true;
    document.getElementById('btnUploadFile').disabled = true;
    document.getElementById('btnBackToStart').disabled = true;
    let code = "";
    let usr = avlTree.searchNode(parseInt(userName));
    usr.value.compartidoConmigo.map(file => {
        if (file.type === 'text/plain') {
            let archivo = new Blob([file.content], { type: file.type });
            const url = URL.createObjectURL(archivo);
            code += `<div class="col-3 pt-2 text-center folder" ondblclick="showContentTXT('${file.content}', '${file.name}', '${file.permission}')">
                <div class="row">
                    <div class="col-12">
                        <img src="images/txt.png" class="" style="width:30%" alt="img_archivo">
                    </div>
                    <div class="col-12">
                        <p class="text-center titleFile"><a class="text-dark text-decoration-none" href="${url}" download>
                        ${file.name}
                        </a>
                        </p>
                    </div>
                </div>
            </div>`
        } else if (file.type === 'application/pdf') {
            code += `<div class="col-3 pt-2 text-center folder" ondblclick="showContentPdf('${file.content}', '${file.name}')">
                <div class="row">
                    <div class="col-12">
                        <img src="images/pdf.png" class="" style="width:30%" alt="img_archivo">
                    </div>
                    <div class="col-12">
                    <p class="text-center titleFile"><a class="text-dark text-decoration-none" href="${file.content}" download>
                    ${file.name}
                    </a>
                    </p>
                    </div>
                </div>
            </div>`
        } else {
            code += `<div class="col-3 pt-2 text-center folder" ondblclick="showContentIMG('${file.content}', '${file.name}')">
                <div class="row">
                    <div class="col-12">
                        <img src="images/image.png" class="" style="width:30%" alt="img_foto">
                    </div>
                    <div class="col-12">
                    <p class="text-center titleFile"><a class="text-dark text-decoration-none" href="${file.content}" download>
                    ${file.name}
                    </a>
                    </p>
                    </div>
                </div>
            </div>`
        }
    })
    $('#folders').html(code)
}

function myUnit() {
    document.getElementById('btnCreateFolder').disabled = false;
    document.getElementById('btnDeleteFolder').disabled = false;
    document.getElementById('btnShareFile').disabled = false;
    document.getElementById('btnUploadFile').disabled = false;
    document.getElementById('btnBackToStart').disabled = false;
    let path = $('#path').val();
    $('#folders').html(tree.getHTML(path))
}

$(document).ready(getData);
$(document).ready(loadStudentInList);