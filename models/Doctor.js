const { Schema, model } = require('mongoose');

const doctorSchema = new Schema({
    code: {
        type: String,
         required: true
    },
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    patronymic: {
        type: String,
        require: true
    },
    specialty: {
        type: String,
        require: true
    }
});

module.exports = model("Doctor", doctorSchema);