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
          tree_n_ary = exist.value.carpetas;
          sparse_matrix = exist.value.carpetas.root.sparseMatrix;
          circular_list = exist.value.acciones;
          localStorage.setItem("avlN_ary", JSON.stringify(JSON.decycle(tree_n_ary)));
          localStorage.setItem("sparseMatrix", JSON.stringify(JSON.decycle(sparse_matrix)));
          localStorage.setItem("circularLinkedList", JSON.stringify(JSON.decycle(circular_list)));
          localStorage.setItem('currentUser', username);
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
  if (localStorage.getItem("avlTree") !== null) {
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
    avlTree.root = temp.root;
  }
}

$(document).ready(getLocalStudents);