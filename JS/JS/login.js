let onError = (e) => {
    alert("Error " + e.target.status + " occurred while receiving the document.");
  }

let onLoad = () => {
    let verify = () => {
        console.log("void")
        if(document.getElementById("usuario").value == "" || document.getElementById("password").value == ""){
            alert("Debes ingresar un usuario y contraseña para poder ingresar")           
        }
        else {
            let nickname = document.getElementById("usuario").value
            let password = document.getElementById("password").value

            let data = { user: nickname, password: password }

            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                body: JSON.stringify(data),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .catch(error => console.log(error))
            .then(response => {
                if(response.outBinds.found){
                    localStorage["user"] = nickname
                    window.location.assign("home.html");
                }
                else {
                    alert("Usuario o contraseña incorrectos")
                }
            })
        }
    }
    let boton = document.getElementById("btnLogin")
    boton.addEventListener('click', verify)
}


addEventListener("DOMContentLoaded", onLoad)


            /*req = new XMLHttpRequest()
            
            req.open('POST', 'http://localhost:3000/api/login', true)
            req.onreadystatechange = () => {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                    // OK
                    //alert('Success');
                    } 
                    else {
                        // not OK
                        alert('failure!');
                    }
                }
            }
        req.addEventListener("error", onError, false)
        req.send(data)*/