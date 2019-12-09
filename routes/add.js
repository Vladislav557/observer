const { Router } = require('express');

const Patient = require('../models/Patient');
const History = require('../models/History');

const router = Router();

router.get('/', (req, res) => {
  res.render('add', {
    title: "Создание новой карты"
  })
});


router.post('/', async (req, res) => {

  const { name, surname, patronymic, sex, birthDate, city, street, house, room, phone, ill, order, ICD, dateOfStartObservation, dateOfCompletion, multiplisityOfFillingCard } = req.body;
  const doctorId = req.user._id;

  const patient = new Patient({
    name, surname, patronymic, sex, birthDate, city, street, house, room, phone, ill, order, ICD, dateOfStartObservation, dateOfCompletion, multiplisityOfFillingCard, doctorId
  });

  const patientId = patient.id;

  const history = new History({patientId});

  try {
    patient.save();
    history.save();
    res.redirect('/list');
  } catch (error) {
    console.log(error);
  }

})

module.exports = router;
