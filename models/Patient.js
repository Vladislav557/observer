const { Schema, model } = require('mongoose');

const patientSchema = new Schema({
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
    sex: {
        type: String,
        require: true,
    },
    birthDate: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    street: {
        type: String,
        require: true
    },
    house: {
        type: Number,
        require: true
    },
    room: {
        type: Number
    },
    phone: {
        type: String
    },
    ill: {
        type: String,
        require: true
    },
    ICD: {
        type: String,
        require: true
    },
    order: {
        type: String,
        required: true
    },
    dateOfStartObservation: {
        type: String,
        require: true
    },
    dateOfCompletion: {
        type: String,
        required: true
    },
    multiplisityOfFillingCard: {
        type: String,
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
});

module.exports = model("Patient", patientSchema);