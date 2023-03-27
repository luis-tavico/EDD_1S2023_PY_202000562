let avlTree = new AvlTree();

function loadStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
    try{        
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {
            
            studentsArray = JSON.parse(fr.result).alumnos;
            $('#studentsTable tbody').html(
                studentsArray.map((item, index) => {
                    return(`
                        <tr>
                            <td>${item.carnet}</td>
                            <td>${item.nombre}</td>
                            <td>${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )
            for(let i = 0; i < studentsArray.length; i++){
                avlTree.insert(studentsArray[i]);
            }
            localStorage.setItem("avlTree", JSON.stringify(avlTree))
            alert('Alumnos cargados con éxito!')
        }
    }catch(error){
        console.log(error);
        alert("Error en la inserción");
    }

}

function showLocalStudents(){
    let temp = localStorage.getItem("avlTree")
    avlTree.root = JSON.parse(temp).root;
    $('#studentsTable tbody').html(
        avlTree.inOrder()
    )
}


function showStudentsForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if(avlTree.root !== null){
        switch(form.traversal){
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

function showAvlGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${avlTree.treeGraph()} }`
    console.log(body);
    $("#graph").attr("src", url + body);
}

$( document ).ready(showLocalStudents);