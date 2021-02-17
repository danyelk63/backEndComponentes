var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var port = 3500;
var mongoose = require("mongoose");
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var md5 = require("md5");

db = require('./models/models');

app.get('/', function (req, res) {
    res.send('Hello World!');
  });

app.listen(port, function () {
console.log('App listening on port ' + port);
});

mongoose.connect('mongodb+srv://daniel:daniel123@clusterserviciosmedicos.agn3m.mongodb.net/healtApp?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {     
    if(err) return err     
    console.log("Conectado a MongoDB") 
})

app.get('/login', jsonParser, (req, res) => {
    let body = req.body;
    db.User.find({userMail: body.userMail}).then(function (users) {
        if(users[0].userMail == body.userMail && users[0].userPass == md5(body.userPass) && users[0] != undefined)
            return res.send({success: true, roll: body.userRoll, pNombre: body.userFirstName, pApellido: body.userFirstLastName, esp: body.userEsp, message: ""})
        else
            return res.send({success: false, message: "Error Usuario o Contraseña incorrectos"})
    }).catch(function (e) {
        res.send(e);
    })
});

app.put('/login', jsonParser, (req, res) => {
    body = req.body;
    if(body.pass == body.pass2)
        db.User.update({userMail: body.userMail, $set: {userPass: body.userPass}}).then(function (respuesta) {
            return res.send(respuesta);
        })
})

app.post('/cita', jsonParser, (req, res) => {
    body = req.body;
    let fechaServidorAux = new Date();
    let fechaServidor = fechaServidorAux.getFullYear() + "-" + fechaServidorAux.getMonth() + "-" + fechaServidorAux.getDay() + " " + fechaServidorAux.getHours() + ":" + fechaServidorAux.getMinutes() + ":" + fechaServidorAux.getSeconds() + "." + fechaServidorAux.getMilliseconds();
    body.fechaCreacion = fechaServidor;
    body.fechaCita = fechaServidor;
    var cita = new db.Cita(body)
    cita.save().then(function (citas) {
        return res.send(citas);
    })
});

app.get('/cita', jsonParser, (req, res) => {
    body = req.body;
    db.Cita.find({userId: body.userId}).then(function (citas) {
        return res.send(citas);
    })
});