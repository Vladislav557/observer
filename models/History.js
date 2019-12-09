const { Schema, model } = require('mongoose');

const historySchema = new Schema({
    nextMeeting: {
        type: Array,
        default: [],
        required: true
    },
    actualMeeting: {
        type: Array,
        default: [],
        required: true
    },
    changeOfDiagnosis: {
        type: Array,
        required: true,
        default: []
    },
    dateOfChangedDiagnosis: {
        type: Array,
        required: true,
        default: []
    },
    ICD: {
        type: Array,
        required: true,
        default: []
    },
    concomitantDisease: {
        type: Array,
        required: true,
        default: []
    },
    ICDConcomitantDisease: {
        type: Array,
        required: true,
        default: []
    },
    action: {
        type: Array,
        required: true,
        default: []
    },
    actionStart: {
        type: Array,
        required: true,
        default: []
    },
    actionEnd: {
        type: Array,
        required: true,
        default: []
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    }
});

module.exports = model("History", historySchema);