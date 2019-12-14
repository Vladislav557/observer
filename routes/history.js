const { Router } = require('express');

const History = require('../models/History');
const Patient = require('../models/Patient');

const authMiddleware = require('../middleware/auth');

const router = Router();

router.get('/', authMiddleware, (req, res) => {
    res.render('history', {
        title: "Главная",
    })
})

module.exports = router;