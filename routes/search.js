const { Router } = require('express');
const Patient = require('../models/Patient');

const authMiddleware = require('../middleware/auth');

const router = Router();

const toUpperFirstChar = (str) => {
    return str[0].toUpperCase() + str.slice(1);
}

router.post('/', authMiddleware, async (req, res) => {
    const data = req.body.search;
    const modData = data.split(' ');
    const candidate = {
        name: toUpperFirstChar(modData[1].toLowerCase()),
        surname: toUpperFirstChar(modData[0].toLowerCase()),
        patronymic: toUpperFirstChar(modData[2].toLowerCase())
    };

    console.log(candidate)

    const patients = await Patient.find(candidate);
        
    
    res.render('list', {
        title: 'Список пациентов',
        patients
    });
})

module.exports = router;