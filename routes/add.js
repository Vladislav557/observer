const { Router } = require('express');

const Patient = require('../models/Patient');
const History = require('../models/History');

const authMiddleware = require('../middleware/auth');

const router = Router();

router.get('/', (req, res) => {
  res.render('add', {
    isAdd: true,
    title: "Создание новой карты"
  })
});


router.post('/', authMiddleware, async (req, res) => {

  const { name, surname, patronymic, sex, birthDate, city, street, house, room, phone, ill, order, ICD, dateOfStartObservation, dateOfCompletion, multiplisityOfFillingCard } = req.body;
  
  const doctorId = req.user._id;

  const patient = new Patient({
    name, surname, patronymic, sex, birthDate, city, street, house, room, phone, ill, order, ICD, dateOfStartObservation, dateOfCompletion, multiplisityOfFillingCard, doctorId
  });

  const patientId = patient.id;

  try {
    await patient.save();
    if (patientId) {
      const history = new History({ patientId });
      await history.save();
    }
    res.redirect(`/list/${patientId}`);
  } catch (error) {
    console.log(error);
  }

})

module.exports = router;
