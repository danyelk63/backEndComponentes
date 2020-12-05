const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const schemas = {
    userSchema: new Schema({
        userMail: { type: String },
        userPass: { type: String },
        userFirstName: { type: String },
        userSecondtName: { type: String },
        userFirstLastName: { type: String },
        userSecondLastName: { type: String },
        userId: { type: String },
        telefono: { type: String },
        userRoll: { type: String },
        userEsp: { type: String }
    }),
    citaSchema: new Schema({
        doctorId: { type: String },
        fechaCreacion: { type: Date },
        fechaCita: { type: Date },
        lugar: { type: String },
        pacienteId: { type: String },
        tipoCita: { type: String },
        estado: { type: String }
    })
}

module.exports = schemas;