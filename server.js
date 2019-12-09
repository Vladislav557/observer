const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const handlebars = require('express-handlebars');

const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const History = require('./models/History');

const homeRoute = require('./routes/homeRoute');
const addRoute = require('./routes/add');
const listRoute = require('./routes/observerListRoute');
const historyRoute = require('./routes/history');
const patientRoute = require('./routes/edit');

const db = require('./config');

const server = express();

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

server.engine('hbs', hbs.engine);
server.set('view engine', 'hbs');
server.set('views');

server.use(async (req, res, next) => {
    try {
        const doctor = await Doctor.findById("5dec1cdb3e7a6e15891d99a6");
        req.user = doctor,
        next();
    } catch (error) {
        console.log(error);
    }
})

server.use(express.static(path.join(__dirname, './public')));

server.use(express.urlencoded({ extended: true }));

server.use('/', homeRoute);
server.use('/list', listRoute);
server.use('/add', addRoute);
server.use('/history', historyRoute);
server.use('/edit', patientRoute);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await mongoose.connect(db.url, { useUnifiedTopology: true,useNewUrlParser: true });
        const candidate = await Doctor.findOne();
        if (!candidate) {
            const doctor = new Doctor({
                code: '155',
                name: 'Vladislav',
                surname: 'Kiselev',
                patronymic: 'Olegovich',
                specialty: 'Терапевт'
            });
            await doctor.save();
        }
        server.listen(PORT, () => {
            console.log(`Server is runnning on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();

