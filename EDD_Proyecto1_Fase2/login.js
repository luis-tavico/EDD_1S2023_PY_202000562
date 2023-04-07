const forms = document.querySelectorAll('.needs-validation');
let avlTree = new AvlTree();

(() => {
  'use strict'
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
      event.preventDefault()
    }, false)
  })
})()

function incorrectPassword() {
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: 'Contraseña incorrecta',
    showConfirmButton: false,
    timer: 1000
  })
}

function login() {
  const username = forms[0][0].value;
  const password = forms[0][1].value;
  if (username != "" && password != "") {
    if (username == "Admin") {
      if (password == "Admin") {
        location.href = "dashboardAdmin.html"
      } else {
        incorrectPassword();
      }
    } else {
      exist = avlTree.searchNode(parseInt(username));
      if (exist) {
        if (password == exist.value.password) {
          circular_list = exist.value.acciones;
          //localStorage.setItem("circularList", JSON.stringify(JSON.decycle(circular_list)));
          let myList = new CircularLinkedList();
          var today = new Date();
          var action = "Carpeta \\\"Imagenes\\\" creada\\nFecha: " + today.toLocaleDateString('es-US') + "\\nHora: " + today.toLocaleTimeString('en-US');
          myList.insert(action)
          let n = myList.getValues();
          let head = myList.getValues();
          while (n) {
            console.log(n.value);
            if (n.next === head) {
              break;
            }
            n = n.next;
          }
          //localStorage.setItem("circularLinkedList", JSON.stringify(myList));
          localStorage.setItem("circularLinkedList", JSON.stringify(JSON.decycle(myList)));
          location.href = "dashboardUser.html";
        } else {
          incorrectPassword();
        }
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Usuario no existe',
          showConfirmButton: false,
          timer: 1000
        })
      }
    }
  }
}

function getLocalStudents() {
  /*
  let temp = localStorage.getItem("avlTree")
  if (temp != null) {
    avlTree.root = JSON.parse(temp).root;
  }
  */
  if (localStorage.getItem("avlTree") !== null) {
    //let temp = localStorage.getItem("circularLinkedList");
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
    avlTree.root = temp.root;
  }



}

$(document).ready(getLocalStudents);