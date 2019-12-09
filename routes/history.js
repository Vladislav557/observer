const { Router } = require('express');

const History = require('../models/History');
const Patient = require('../models/Patient');

const router = Router();

router.get('/', (req, res) => {
    res.render('history', {
        title: "Главная",
    })
})

module.exports = router;