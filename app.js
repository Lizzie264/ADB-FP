let express = require('express') //structure for apps in back-end, framework to load server, redirect routes
let path = require('path') // ruta para acceder a metodos del servicio
let cors = require('cors')

let port = 3000
let app = express()

//let index = require('./routes/index')
let survey = require('./routes/surveyH')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//app.use('/', index)
app.use('/api', survey)

app.listen(port, () => {
    console.log(`Servidor iniciado en puerto ${port}`)
})

/*const oracledb = require('oracledb')
async function run(){
    let con = await oracledb.getConnection({​​
        user: "ADMIN",
        password: "Panterarosa55#",
        connectString: "wpsbp6qke4a3zsp_db202103061423_high.adb.oraclecloud.com"
    }​​);

    let result = await con.execute("select sysdate from dual");
    console.log(result.rows[0]);
}

run()*/