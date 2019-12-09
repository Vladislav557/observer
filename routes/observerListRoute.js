const { Router } = require('express');

const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const History = require('../models/History');

const router = Router();

router.get('/', async (req, res) => {
    const patients = await Patient.find();

    res.render('list', {
        title: 'Список пациентов',
        patients
    });
});

router.get('/:id', async (req, res) => {    
    const patient = await Patient.findById(req.params.id);
    const doctor = await Doctor.findById("5dec1cdb3e7a6e15891d99a6");

    const patientId = patient.id;

    const history = await History.findOne({ patientId });

    const data = {
        patient,
        doctor,
        history
    };

    res.render('patient', {
        title:  `${patient.name} ${patient.surname} ${patient.patronymic}`,
        data
    });
});

module.exports = router;