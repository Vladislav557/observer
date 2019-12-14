const { Router } = require('express');
const bcrypt = require('bcryptjs');

const Doctor = require('../models/Doctor');

const router = Router();

router.get('/regist', (req, res) => {
    res.render('regist',{
        isRegist: true,
        error: req.flash('error')
    });
})

router.post('/regist', async (req, res) => {
    try {
        const { code, name, surname, patronymic, specialty, password } = req.body;
        
        const candidate = await Doctor.findOne({ code });

        if (candidate) {
            req.flash('error', 'Доктор с этим кодом уже зарегистрирован');
            res.redirect('/regist');
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const doctor = new Doctor({ code, name, surname, patronymic, specialty, password: hashPassword });
            await doctor.save();
            res.redirect('/auth');
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;