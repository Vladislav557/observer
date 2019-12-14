const { Router } = require('express');
const bcrypt = require('bcryptjs');

const Doctor = require('../models/Doctor');
const router = Router();

router.get('/auth', async (req, res) => {
    res.render('auth', {
        isAuthenticated: true,
        error: req.flash('error')
    });
});

router.post('/auth', async (req, res) => {

    try {
        const { code, password } = req.body;

        const candidate = await Doctor.findOne({ code });

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);
            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save((error) => {
                    if (error) throw error;
                    res.redirect('/');
                });
            } else {
                req.flash('error', 'Неверный пароль')
                res.redirect('/auth');
            }
        } else {
            req.flash('error', 'Доктора с таким кодом не существует')
            res.redirect('/auth');
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/auth/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth');
    });
});

module.exports = router;