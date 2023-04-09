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
    tree.insert(folderName, path);
    newCircularList.insert(messageCreateFolder(folderName));
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: '¡Carpeta creada exitosamente!',
        showConfirmButton: false,
        timer: 1000
    })
    $('#folders').html(tree.getHTML(path))
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

function messageCreateFile(fileName) {
    var today = new Date();
    var action = "Archivo \\\"" + fileName + "\\\" creado\\nFecha: " + today.toLocaleDateString('es-US') + "\\nHora: " + today.toLocaleTimeString('en-US');
    return action;
}

function entrarCarpeta(folderName) {
    let path = $('#path').val();
    let curretPath = path == '/' ? path + folderName : path + "/" + folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#folders').html(tree.getHTML(curretPath))
    console.log(tree.getFilesMatrix(curretPath));
    sparseMatrix.head = tree.getFilesMatrix(curretPath).head;
    sparseMatrix.folderName = tree.getFilesMatrix(curretPath).folderName;
    localStorage.setItem("sparseMatrix", JSON.stringify(JSON.decycle(sparseMatrix)));
}

function retornarInicio() {
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
    /*
    let path = $('#path').val();
    let url = 'https://quickchart.io/graphviz?graph=';
    console.log(tree.matrixGrpah(path))
    // let body = `digraph G { ${tree.matrixGrpah(path)} }`
    $("#graph").attr("src", url + body);
    */
    let url = 'https://quickchart.io/graphviz?graph=';
    //console.log(sparseMatrix.graph());
    let body = `digraph G { ${sparseMatrix.graph()} }`
    $("#graphFiles").attr("src", url + body);
}

function showCircularGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = newCircularList.graph();
    //console.log(body);
    $("#graphActions").attr("src", url + body);
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const subirArchivo = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    // console.log(form.file.type);
    let path = $('#path').val();
    if (form.file.type === 'text/plain') {
        // ARCHIVO DE TEXTO
        let fr = new FileReader();
        fr.readAsText(form.file);
        fr.onload = () => {
            // CARGAR ARCHIVO A LA MATRIZ
            tree.getFolder(path).files.push({
                name: form.fileName,
                content: fr.result,
                type: form.file.type
            })
            $('#folders').html(tree.getHTML(path));
        };
    } else {
        // IMÁGENES O PDF 
        let parseBase64 = await toBase64(form.file);
        tree.getFolder(path).files.push({
            name: form.fileName,
            content: parseBase64,
            type: form.file.type
        })
        $('#folders').html(tree.getHTML(path));
        // console.log(parseBase64)
        // $("#imagenSubida").attr("src", imgBase64); 
        // console.log(await toBase64(form.file));
    }
    alert('Archivo Subido!')
}

function getLocalStudents() {
    let temp = localStorage.getItem("avlTree")
    if (temp != null) {
        avlTree.root = JSON.parse(temp).root;
    }
}

function getLocalFoldersAndFiles() {
    let temp = localStorage.getItem("avlN_ary")
    tree.root = JSON.parse(temp).root;
    tree.size = JSON.parse(temp).size;
    let path = $('#path').val();
    $('#folders').html(tree.getHTML(path))
    ///////////////////
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
    //e.preventDefault();
    $('#users').html(
        "<option value=\"\" selected disabled>---</option>" + avlTree.showStudents()
    )
}

function logout() {
    currentUser = avlTree.searchNode(parseInt(userName));
    currentUser.value.acciones = newCircularList;
    currentUser.value.carpetas = tree;
    localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
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