const mongoose = require('mongoose'), 
      schema = require('../schemas/schemas');

const models = {
    User: mongoose.model('user', schema.userSchema),
    Cita: mongoose.model('cita', schema.citaSchema)
}

module.exports = models;