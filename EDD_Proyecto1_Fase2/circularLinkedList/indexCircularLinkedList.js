let cicular_linked_list = new CircularLinkedList();

function showCircularGraph() {
    var today = new Date();
    var action = "Carpeta \\\"Imagenes\\\" creada\\nFecha: " + today.toLocaleDateString('es-US') + "\\nHora: " + today.toLocaleTimeString('en-US');
    cicular_linked_list.insert(action)
    //
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = cicular_linked_list.graph()
    console.log(body);
    $("#graphActions").attr("src", url + body);
}

/*
function showGraph(){
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("matriz")));
    matrix.head = temp.head;
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${matrix.graph()} }`
    $("#graph").attr("src", url + body);
}
*/