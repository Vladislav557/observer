const { Router } = require('express');
const Patient = require('../models/Patient');

const router = Router();

router.post('/', async (req, res) => {
    const data = req.body.search;
    const modData = data.split(' ');
    const patient = {
        name: modData[1],
        surname: modData[0],
        patronymic: modData[2]
    };

    const patients = await Patient.find(patient);


    res.render('list', {
        title: 'Список пациентов',
        patients
    })
})

module.exports = router;