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
            /*
            $('#studentsTable tbody').html(
                studentsArray.map((item, index) => {
                    return (`
                        <tr>
                            <td>${item.carnet}</td>
                            <td>${item.nombre}</td>
                            <td>${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )*/
            for (let i = 0; i < studentsArray.length; i++) {
                if (i == 0) {
                    let actions = new CircularLinkedList();
                    var today = new Date();
                    var action = "Carpeta \\\"Imagenes\\\" creada\\nFecha: " + today.toLocaleDateString('es-US') + "\\nHora: " + today.toLocaleTimeString('en-US');
                    actions.insert(action)
                    let student = new Student(studentsArray[i].nombre, studentsArray[i].carnet, studentsArray[i].password, "/", "folders", actions);
                    avlTree.insert(student);
                } else {
                    let student = new Student(studentsArray[i].nombre, studentsArray[i].carnet, studentsArray[i].password, "/", "folders", "actions");
                    avlTree.insert(student);
                    //avlTree.insert(studentsArray[i]);
                }

            }
            $('#studentsTable tbody').html(
                avlTree.inOrder()
            )
            //localStorage.setItem("avlTree", JSON.stringify(avlTree))
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
    let temp = localStorage.getItem("avlTree")
    if (temp != null) {
        avlTree.root = JSON.parse(temp).root;
        console.log(JSON.parse(temp).root)
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