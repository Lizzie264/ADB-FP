const { NUMBER } = require('oracledb');
const oracledb = require('oracledb')
oracledb.initOracleClient({ libDir: 'D:\\oracle\\instantclient_19_6' });
oracledb.autoCommit = true;

module.exports.login = (request, response) => {
    let data = request.body
    console.log(data)
    oracledb.getConnection({
        user: "ADMIN",
        password: "Panterarosa55#",
        connectString: "db202103061423_high"
    }, (err, connection) => {
        if (err) {
            console.error(err.message);
        }
    
        const params = {
            usr: data.user,
            pwd: data.password,
            found: { val: false, dir: oracledb.BIND_INOUT, type: oracledb.DB_TYPE_BOOLEAN }
        }

        connection.execute('BEGIN login(:usr, :pwd, :found); END;', params, (err, result) => {
            if (err)
                console.error(err.message)
    
            console.log(result)
            response.json(result)
        });
    });
}

module.exports.addUser = (request, response) => {
    let data = request.body
    console.log(data)
    oracledb.getConnection({
        user: "ADMIN",
        password: "Panterarosa55#",
        connectString: "db202103061423_high"
    }, (err, connection) => {
        if (err) {
            console.error(err.message);
        }
    
        const params = {
            usr: data.user,
            nme: data.name,
            snme: data.surname,
            email: data.email,
            pwd: data.password,
            found: { val: false, dir: oracledb.BIND_INOUT, type: oracledb.DB_TYPE_BOOLEAN }
        }

        /*connection.execute('BEGIN INSERT INTO users VALUES(DEFAULT, :usr, :nme, :snme, :email, :pwd); END;', params, {autoCommit: true}, (err, result) => {
            if (err)
                console.error(err.message)
    
            console.log(result)
            response.json(result)
        });*/

        connection.execute('BEGIN addUser(:usr, :nme, :snme, :email, :pwd, :found); END;', params, (err, result) => {
            if (err)
                console.error(err.message)
    
            console.log(result)
            response.json(result)
        });
    });
}

module.exports.createSurvey = (request, response) => {
    let data = request.body
    console.log(data)
    oracledb.getConnection({
        user: "ADMIN",
        password: "Panterarosa55#",
        connectString: "db202103061423_high"
    }, (err, connection) => {
        if (err) {
            console.error(err.message);
        }

        let numberQuest = parseInt(data.numQ)
        let idQuest = parseInt(data.numQ)
    
        const params = {
            nme: data.nameS,
            desc: { val: data.desc, dir: oracledb.BIND_IN, type: oracledb.DB_TYPE_CLOB },
            //numQ: { val: data.numQ, dir: oracledb.BIND_IN, type: SMALLINT},
            numQ: numberQuest,
            codeS: data.codeS,
            nn: data.nn, 
            ins: { val: true, dir: oracledb.BIND_INOUT, type: oracledb.DB_TYPE_BOOLEAN },
            idSurvey: {val: idQuest, dir: oracledb.BIND_INOUT, type: oracledb.DB_TYPE_NUMBER}
        }

        connection.execute('BEGIN createSurvey(:nme, :desc, :numQ, :codeS, :nn, :ins, :idSurvey); END;', params, (err, result) => {
            if (err)
                console.error(err.message)
    
            console.log(result)
            response.json(result)
        });
    });
}

module.exports.createQuestion = (request, response) => {
    let data = request.body
    console.log(data)
    oracledb.getConnection({
        user: "ADMIN",
        password: "Panterarosa55#",
        connectString: "db202103061423_high"
    }, (err, connection) => {
        if (err) {
            console.error(err.message);
        }
        
        let idSurvey = parseInt(data.idSurvey)
        let noQuest = parseInt(data.noQuest)

        console.log(isNaN(idSurvey))
        console.log(isNaN(noQuest))
    
        const params = {
            idSurv: {val: idSurvey, dir: oracledb.BIND_IN, type: oracledb.DB_TYPE_NUMBER},
            //idSurv: idSurvey,
            noQ: noQuest,
            txtV: { val: data.txtV, dir: oracledb.BIND_IN, type: oracledb.DB_TYPE_CLOB },
            typeQ: data.typeQ
        }

       connection.execute('BEGIN createQuestion(:idSurv, :noQ, :txtV, :typeQ); END;', params, (err, result) => {
            if (err)
                console.error(err.message)
    
            console.log(result)
            response.json(result)
        });
    });
}

module.exports.createAnswer = (request, response) => {
    let data = request.body
    console.log(data)
    oracledb.getConnection({
        user: "ADMIN",
        password: "Panterarosa55#",
        connectString: "db202103061423_high"
    }, (err, connection) => {
        if (err) {
            console.error(err.message);
        }
        
        let idSurvey = parseInt(data.idSurvey)
        let noQuest = parseInt(data.noQuest)
        let noAnser = parseInt(data.noAns)
    
        const params = {
            idS: {val: idSurvey, dir: oracledb.BIND_INOUT, type: oracledb.DB_TYPE_NUMBER},
            noQ: noQuest,
            txtV: { val: data.txtV, dir: oracledb.BIND_IN, type: oracledb.DB_TYPE_CLOB },
            noAns: noAnser
        }

        connection.execute('BEGIN createAnswer(:idS, :noQ, :txtV, :noAns); END;', params, (err, result) => {
            if (err)
                console.error(err.message)
    
            console.log(result)
            response.json(result)
        });
    });
}