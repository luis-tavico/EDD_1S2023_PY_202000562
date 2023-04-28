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
        pass = decrypt_data(exist.value.password);
        if (password == pass) {
          circular_list = exist.value.acciones;
          localStorage.setItem("circularLinkedList", JSON.stringify(JSON.decycle(circular_list)));
          var currentUser = new Object();
          currentUser.carnet = exist.value.carnet;
          currentUser.nombre = exist.value.nombre;
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
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

function decrypt_data(string) {
  var newString = '',
    char, codeStr, firstCharCode, lastCharCode;
  string = string.match(/.{1,4}/g).reduce((acc, char) => acc + String.fromCharCode(parseInt(char, 16)), "");
  for (var i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    if (char > 132) {
      codeStr = char.toString(10);
      firstCharCode = parseInt(codeStr.substring(0, codeStr.length - 2), 10);
      lastCharCode = parseInt(codeStr.substring(codeStr.length - 2, codeStr.length), 10) + 31;
      newString += String.fromCharCode(firstCharCode) + String.fromCharCode(lastCharCode);
    } else {
      newString += string.charAt(i);
    }
  }
  return newString;
}

function getLocalStudents() {
  if (localStorage.getItem("avlTree") !== null) {
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
    avlTree.root = temp.root;
  }
}

$(document).ready(getLocalStudents);