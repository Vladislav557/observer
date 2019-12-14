const { Router } = require('express');

const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const History = require('../models/History');

const authMiddleware = require('../middleware/auth');

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
    const patients = await Patient.find({ doctorId: req.user._id });

    res.render('list', {
        isList: true,
        title: 'Список пациентов',
        patients
    });
});

router.get('/:id', authMiddleware, async (req, res) => {    
    const patient = await Patient.findById(req.params.id);
    const doctor = await Doctor.findById(req.user._id);

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