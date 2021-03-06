const { Router } = require('express');

const History = require('../models/History');
const Patient = require('../models/Patient');

const authMiddleware = require('../middleware/auth');

const router = Router();

router.get('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({ patientId: id });
    const patient = await Patient.findOne({ _id: id });
    const data = {
        history,
        patient
    };
    res.render('patient-edit', {
        data
    });
});

router.put('/:id/nextMeeting/add', authMiddleware, async (req, res) => {
    const { nextMeeting } = req.body;
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newMeetings = [...history.nextMeeting, nextMeeting];
    await history.updateOne({ nextMeeting: newMeetings })
    res.redirect(`/edit/${id}`);
}); 

router.delete('/:id/nextMeeting/remove', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newMeetings = [...history.nextMeeting.slice(0, history.nextMeeting.length - 1)];
    await history.updateOne({ nextMeeting: newMeetings });
    res.redirect(`/edit/${id}`);
}); 

router.put('/:id/actualMeeting/add', authMiddleware, async (req, res) => {
    const { actualMeeting } = req.body;
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newMeetings = [...history.actualMeeting, actualMeeting];
    await history.updateOne({ actualMeeting: newMeetings })
    res.redirect(`/edit/${id}`);
}); 

router.delete('/:id/actualMeeting/remove', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newMeetings = [...history.actualMeeting.slice(0, history.actualMeeting.length - 1)];
    await history.updateOne({ actualMeeting: newMeetings });
    res.redirect(`/edit/${id}`);
});

router.put('/:id/change/add', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newData = [...history.dateOfChangedDiagnosis, req.body.dateOfChangedDiagnosis];
    const newDs = [...history.changeOfDiagnosis, req.body.changeOfDiagnosis];
    const newICD = [...history.ICD, req.body.ICD];

    await history.updateOne({ dateOfChangedDiagnosis: newData,  changeOfDiagnosis: newDs, ICD: newICD});
    res.redirect(`/edit/${id}`);
});

router.delete('/:id/change/remove', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newDate = [...history.dateOfChangedDiagnosis.slice(0, history.dateOfChangedDiagnosis.length - 1)];
    const newDs = [...history.changeOfDiagnosis.slice(0, history.changeOfDiagnosis.length - 1)];
    const newICD = [...history.ICD.slice(0, history.ICD.length - 1)];

    await history.updateOne({ dateOfChangedDiagnosis: newDate,  changeOfDiagnosis: newDs, ICD: newICD});
    res.redirect(`/edit/${id}`);
});

router.put('/:id/concomitantDisease/add', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newData = [...history.concomitantDisease, req.body.concomitantDisease];
    await history.updateOne({ concomitantDisease: newData });
    res.redirect(`/edit/${id}`);
});

router.delete('/:id/concomitantDisease/remove', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newData = [...history.concomitantDisease.slice(0, history.concomitantDisease.length - 1)];
    await history.updateOne({ concomitantDisease: newData });
    res.redirect(`/edit/${id}`);
});

router.put('/:id/action/add', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newData = [...history.action, req.body.action];
    const newDateStart = [...history.actionStart, req.body.actionStart];
    const newDateEnd = [...history.actionEnd, req.body.actionEnd];

    await history.updateOne({ action: newData,  actionStart: newDateStart, actionEnd: newDateEnd});
    res.redirect(`/edit/${id}`);
});

router.delete('/:id/action/remove', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newData = [...history.action.slice(0, history.action.length - 1)];
    const newDateStart = [...history.actionStart.slice(0, history.actionStart.length - 1)];
    const newDateEnd = [...history.actionEnd.slice(0, history.actionEnd.length - 1)];

    await history.updateOne({ action: newData,  actionStart: newDateStart, actionEnd: newDateEnd});
    res.redirect(`/edit/${id}`);
});

router.get('/basic/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const patient = await Patient.findById(id);
    res.render('patient-edit-basic', {
        patient
    });
});

router.patch('/basic/ill/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const ill = req.body.ill;
    await Patient
        .findById({ _id: id })
        .updateOne({ ill });
    
    res.redirect(`/edit/basic/${id}`);
});

router.patch('/basic/ICD/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const ICD = req.body.ICD;
    await Patient
        .findById({ _id: id })
        .updateOne({ ICD });
    
    res.redirect(`/edit/basic/${id}`);
});

router.patch('/basic/dateOfCompletion/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const dateOfCompletion = req.body.dateOfCompletion;
    await Patient
        .findById({ _id: id })
        .updateOne({ dateOfCompletion });
    
    res.redirect(`/edit/basic/${id}`);
});
router.patch('/basic/dateOfStartObservation/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const dateOfStartObservation = req.body.dateOfStartObservation;
    await Patient
        .findById({ _id: id })
        .updateOne({ dateOfStartObservation });
    
    res.redirect(`/edit/basic/${id}`);
});
router.patch('/basic/order/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const order = req.body.order;
    await Patient
        .findById({ _id: id })
        .updateOne({ order });
    
    res.redirect(`/edit/basic/${id}`);
});
router.patch('/basic/multiplisityOfFillingCard/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const multiplisityOfFillingCard = req.body.multiplisityOfFillingCard;
    await Patient
        .findById({ _id: id })
        .updateOne({ multiplisityOfFillingCard });
    
    res.redirect(`/edit/basic/${id}`);
});
router.patch('/basic/phone/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const phone = req.body.phone;
    await Patient
        .findById({ _id: id })
        .updateOne({ phone });
    
    res.redirect(`/edit/basic/${id}`);
});

router.patch('/basic/adres/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    const { city, street, house, room } = req.body;
    await Patient
        .findById({ _id: id })
        .updateOne({ city, street, house, room });
    
    res.redirect(`/edit/basic/${id}`);
});

router.delete('/remove/:id', authMiddleware, async (req, res) => {
    const id = req.params.id;
    await Patient.findByIdAndDelete({_id: id});
    await History.findOneAndDelete({patientId: id});
    res.redirect('/list');
});

module.exports = router;