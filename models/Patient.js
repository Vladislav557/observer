const { Schema, model } = require('mongoose');

const patientSchema = new Schema({
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
    sex: {
        type: String,
        required: true,
    },
    birthDate: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    room: {
        type: Number
    },
    phone: {
        type: String
    },
    ill: {
        type: String,
        required: true
    },
    ICD: {
        type: String,
        required: true
    },
    order: {
        type: String,
        required: true
    },
    dateOfStartObservation: {
        type: String,
        required: true
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