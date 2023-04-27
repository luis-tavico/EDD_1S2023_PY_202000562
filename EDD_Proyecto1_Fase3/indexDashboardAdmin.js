let avlTree = new AvlTree();
let tableHash = new HashTable();

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
            stds = avlTree.inOrderList();
            stds.forEach(student => tableHash.insert(student));
            $('#studentsTable tbody').html(
                tableHash.print()
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

function getLocalStudents() {
    if (localStorage.getItem("avlTree") != null) {
        let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
        avlTree.root = temp.root;
        /////////////////////////
        stds = avlTree.inOrderList();
        stds.forEach(student => tableHash.insert(student));
        $('#studentsTable tbody').html(
            tableHash.print()
        )
    }
}

$(document).ready(getLocalStudents);