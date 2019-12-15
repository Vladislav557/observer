const { Schema, model } = require('mongoose');

const doctorSchema = new Schema({
    code: {
        type: String,
         required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    patronymic: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model("Doctor", doctorSchema);