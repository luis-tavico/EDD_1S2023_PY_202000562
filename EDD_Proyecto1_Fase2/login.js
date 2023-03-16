const forms = document.querySelectorAll('.needs-validation');

(() => {
  'use strict'
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

btn_login.addEventListener("click", (event) => {
  const username = forms[0][0].value;
  const password = forms[0][1].value;
  if (username != "" && password != "") {
    if (username == "Admin" && password == "Admin") {
      alert("Welcome")
    } else if (username == "202000562" && password == "contra123") {
      alert("Hello")
    }
  }
})