let avlTree = new AvlTree();
let tree = new Tree();
let cicularList = new CircularLinkedList();
let newCircularList = new CircularLinkedList();
var userName = localStorage.getItem('currentUser');
document.querySelector(".userName").textContent = userName;

function crearCarpeta(e) {
    e.preventDefault();
    let folderName = $('#folderName').val();
    let path = $('#path').val();
    tree.insert(folderName, path);
    var today = new Date();
    var action = "Carpeta \\\"" + folderName + "\\\" creada\\nFecha: " + today.toLocaleDateString('es-US') + "\\nHora: " + today.toLocaleTimeString('en-US');
    newCircularList.insert(action);
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: '¡Carpeta creada exitosamente!',
        showConfirmButton: false,
        timer: 1000
    })
    $('#folders').html(tree.getHTML(path))
}

function entrarCarpeta(folderName) {
    let path = $('#path').val();
    let curretPath = path == '/' ? path + folderName : path + "/" + folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#folders').html(tree.getHTML(curretPath))
}

function retornarInicio() {
    $('#path').val("/");
    $('#folders').html(tree.getHTML("/"))
}

function showTreeGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graph()} }`
    $("#graph").attr("src", url + body);
}

function showMatrixGraph() {
    let path = $('#path').val();
    let url = 'https://quickchart.io/graphviz?graph=';
    console.log(tree.matrixGrpah(path))
    // let body = `digraph G { ${tree.matrixGrpah(path)} }`
    $("#graph").attr("src", url + body);
}

function showCircularGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    //
    /*
    let n = cicularList.getValues();
    let head = cicularList.getValues();
    while (n) {
        console.log(n.value);
        n = n.next;
        if (n.next == head) {
            break;
        }
    }
    */
    //
    let body = newCircularList.graph();
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

function getLocalFolders() {

}

function getLocalCircularList() {
    if (localStorage.getItem("circularLinkedList") !== null) {
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
}

function logout() {
    currentUser = avlTree.searchNode(parseInt(userName));
    currentUser.value.acciones = newCircularList;
    localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
    location.href = "login.html";
    localStorage.removeItem('currentUser');
}

$(document).ready(getLocalStudents);
$(document).ready(getLocalFolders);
$(document).ready(getLocalCircularList);