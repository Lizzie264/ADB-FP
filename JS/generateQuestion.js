let counterQuest = 0

const createQuest = () => {
    let typeQuest = document.getElementById("SelectQuest").value

    if(typeQuest == ""){
        alert("Debes seleccionar un tipo de pregunta")
        return
    }

    counterQuest++

    if(typeQuest != "open"){
        let numAnswersContenedor = document.getElementById("numAnswersContenedor")
        let questionName = "questionName" + counterQuest
        askNumAns(questionName)     
    }
    //let structure = "<div><input type='text' placeholder='Escribe tu pregunta aqui' name='questionName'+ counterQuest  /></div>"
    let div = document.createElement("div")
    let text = document.createElement("input")
    text.setAttribute("type", "text")
    text.setAttribute("class", typeQuest)
    text.setAttribute("placeholder", "Escribe tu pregunta aqui")
    text.setAttribute("id", "questionNum" + counterQuest)

    let questionContenedor = document.getElementById("questionContenedor")

    div.appendChild(text)
    questionContenedor.appendChild(div)
}

const validateNumAns = (questionName) => {
    if(document.getElementById("numberOfAnswers").value <= 1.9  || document.getElementById("numberOfAnswers").value > 5){
        alert("Ingresa un numero de respuesta valido")
        return
    }
    else{
        //numAnswersContenedor.innerHTML = ""
        for(i = 1; i <= document.getElementById("numberOfAnswers").value; i++){
            //structure += "<div><input type='text' placeholder='Respuesta' + counterAnswer name='questionName' + i /></div>"

            let div = document.createElement("div")
            let text = document.createElement("input")
            text.setAttribute("type", "text")
            text.setAttribute("placeholder", "Respuesta" + i)
            text.setAttribute("id", questionName + "Ans" + i)

            div.appendChild(text)
            questionContenedor.appendChild(div)
        }
        numAnswersContenedor.removeChild(document.getElementById("divAnswers"))
    } 
}

const askNumAns = (questionName) => {
   //let structure = "<div><input type='text' placeholder='Numero de respuestas entre 1 y 5' name='numberOfAnswers'/><input type='button' value='Añadir' id='btnAddAnswers' onclick='validateNumAns()' class='btnPurple'/></div>"
    let div = document.createElement("div")
    let text = document.createElement("input")
    let btnAns = document.createElement("input")
    div.setAttribute("id", "divAnswers")
    text.setAttribute("type", "text")
    text.setAttribute("placeholder", "Numero de respuestas entre 2 y 5")
    text.setAttribute("id", "numberOfAnswers")
    btnAns.setAttribute("type", "button")
    btnAns.setAttribute("value", "añadir")
    btnAns.setAttribute("id", "btnAddAnswers")
    btnAns.classList.add("btnPurple")
    btnAns.addEventListener('click', function(){validateNumAns(questionName)})

    div.appendChild(text)
    div.appendChild(btnAns)
    numAnswersContenedor.appendChild(div)
    
}

async function saveSurvey(){
    let form = document.getElementById("register")
    let inputs = form.getElementsByTagName("input")

    for(let i = 0, len = inputs.length; i < len; i++) {
        input = inputs[i];
        if(!input.value) {
            alert("Debes llenar todos los campos para poder continuar");
            return
        }
    }

    let nameS = document.getElementById("nameSurveys").value
    let descript = document.getElementById("description").value
    let codeS = document.getElementById("codeSurvey").value
    let nina = localStorage["user"]
    //let idSurv
    localStorage["success"] = false
   
    let data = { nameS: nameS, desc: descript, numQ: counterQuest, codeS: codeS, nn: nina }

    async function fetchSurvey() {
        return fetch('http://localhost:3000/api/createSurvey', {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => {
            console.log(error) 
            alert("La encuesta no pudo ser creada, intente mas tarde")})
        .then(response => {
            if(response.outBinds.ins){
                alert("Estructura de la encuesta creada correctamente")
                localStorage["idSurv"] = response.outBinds.idSurvey
                console.log(response.outBinds.idSurvey)
                localStorage["success"] = true
                console.log(localStorage["success"])
            }
            else {
                alert("El codigo ingresado ya existe")
            }
        })         
    }

    console.log(localStorage["idSurv"] )

    async function fetchQuestions(){
        await fetchSurvey()

        for(i = 1; i <= counterQuest; i++){
            let questString = "questionNum" + i
            //console.log(questString)
            let txtV = document.getElementById(questString)
            //console.log(txtV.className)
            let idSurv = (parseInt(localStorage["idSurv"]))
    
            let data = { idSurvey: idSurv, noQuest: i, txtV: txtV.value, typeQ: txtV.className}
    
            fetch('http://localhost:3000/api/createQuestion', {
                method: 'POST',
                body: JSON.stringify(data),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .catch(error => {
                console.log(error) 
                alert("Error al registrar las preguntas")})
            .then(response => {
                console.log(response)
            })  
        }
    }

    async function fetchAnswers() {
        await fetchQuestions()
        for(i = 1; i <= counterQuest; i++){
            let questString = "questionNum" + i
            let txtV = document.getElementById(questString)

            if(txtV.className != "open"){
                let idSurv = (parseInt(localStorage["idSurv"]))
                let countAnswers = 1
                let ansString = "questionName" + i + "Ans" + countAnswers

                console.log("Reach just before while")

                console.log(document.getElementById(ansString))
                while(document.getElementById(ansString) != null){
                    console.log(ansString)

                    let txtAns = document.getElementById(ansString).value
                    let data = { idSurvey: idSurv, noQuest: i, txtV: txtAns, noAns: countAnswers}
        
                    fetch('http://localhost:3000/api/createAnswer', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                    .catch(error => {
                        console.log(error) 
                        alert("Error al registrar las respuestas")})
                    .then(response => {
                        console.log(response)
                    })  

                    countAnswers++
                    ansString = "questionName" + i + "Ans" + countAnswers
                }
            }      
        }
    }

    fetchAnswers()
    
    /*if(localStorage["success"] == true){
        
    }*/
}

/*let boton = document.getElementById("btnSaveQuest")
boton.addEventListener('click', saveSurvey) 

let onLoad = () => {
   
}

addEventListener("DOMContentLoaded", onLoad)*/


