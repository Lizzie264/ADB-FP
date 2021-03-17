let onError = (e) => {
    alert("Error " + e.target.status + " occurred while receiving the document.");
  }

let onLoad = () => {
    let addUser = () => {
        let regEx = /[a-zA-Z0-9]+@+[a-z]+\.[a-z]+/
        if(document.getElementById("nickname").value == "" || document.getElementById("nameUser").value == "" || document.getElementById("surnameUser").value == "" || document.getElementById("mailUser").value == "" || document.getElementById("passwordUser").value == "" || document.getElementById("reinforcePassword").value == ""){
            alert("Debes llenar todos los campos para poder continuar")           
        }
        else if(document.getElementById("passwordUser").value != document.getElementById("reinforcePassword").value){
            alert("Las contraseñas no coinciden")   
        }
        else if(!regEx.test(document.getElementById("mailUser").value)){
            alert("Correo invalido")  
        }
        else {
            let nicknameU = document.getElementById("nickname").value
            let nameUser= document.getElementById("nameUser").value
            let surnameUser= document.getElementById("surnameUser").value
            let mailUser= document.getElementById("mailUser").value
            let passwordU = document.getElementById("passwordUser").value
            let data = { user: nicknameU, name: nameUser, surname:surnameUser, email: mailUser, password: passwordU }

            fetch('http://localhost:3000/api/newUser', {
                method: 'POST',
                body: JSON.stringify(data),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .catch(error => console.log(error))
            .then(response => {
                if(!response.outBinds.found){
                    alert("Usuario creado correctamente")
                }
                else {
                    alert("El usuario no pudo ser creado, intente mas tarde")
                }
            })
        }
    }
    let boton = document.getElementById("btnRegisUser")
    boton.addEventListener('click', addUser)
}


addEventListener("DOMContentLoaded", onLoad)