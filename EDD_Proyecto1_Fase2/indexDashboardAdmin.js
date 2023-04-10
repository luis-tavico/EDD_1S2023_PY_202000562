let avlTree = new AvlTree();

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
                let student = new Student(studentsArray[i].nombre, studentsArray[i].carnet, studentsArray[i].password, "/", folders, actions);
                avlTree.insert(student);
            }
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

function showLocalStudents() {
    if (localStorage.getItem("avlTree") != null) {
        let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
        avlTree.root = temp.root;
        $('#studentsTable tbody').html(
            avlTree.inOrder()
        )
    }
}

function showStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if (avlTree.root !== null) {
        switch (form.traversal) {
            case 'inOrder':
                $('#studentsTable tbody').html(
                    avlTree.inOrder()
                )
                break;
            case 'preOrder':
                $('#studentsTable tbody').html(
                    avlTree.preOrder()
                )
                break;
            case 'postOrder':
                $('#studentsTable tbody').html(
                    avlTree.postOrder()
                )
                break;
            default:
                $('#studentsTable tbody').html("")
                break;
        }
    }
}

function showAvlGraph() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${avlTree.treeGraph()} }`
    $("#graph").attr("src", url + body);
}

$(document).ready(showLocalStudents);