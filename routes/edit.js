const { Router } = require('express');

const History = require('../models/History');
const Patient = require('../models/Patient');

const router = Router();

router.get('/:id', async (req, res) => {
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

router.put('/:id/nextMeeting/add', async (req, res) => {
    const { nextMeeting } = req.body;
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newMeetings = [...history.nextMeeting, nextMeeting];
    await history.updateOne({ nextMeeting: newMeetings })
    res.redirect(`/edit/${id}`);
}); 

router.delete('/:id/nextMeeting/remove', async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newMeetings = [...history.nextMeeting.slice(0, history.nextMeeting.length - 1)];
    await history.updateOne({ nextMeeting: newMeetings });
    res.redirect(`/edit/${id}`);
}); 

router.put('/:id/actualMeeting/add', async (req, res) => {
    const { actualMeeting } = req.body;
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newMeetings = [...history.actualMeeting, actualMeeting];
    await history.updateOne({ actualMeeting: newMeetings })
    res.redirect(`/edit/${id}`);
}); 

router.delete('/:id/actualMeeting/remove', async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newMeetings = [...history.actualMeeting.slice(0, history.actualMeeting.length - 1)];
    await history.updateOne({ actualMeeting: newMeetings });
    res.redirect(`/edit/${id}`);
});

router.put('/:id/change/add', async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newData = [...history.dateOfChangedDiagnosis, req.body.dateOfChangedDiagnosis];
    const newDs = [...history.changeOfDiagnosis, req.body.changeOfDiagnosis];
    const newICD = [...history.ICD, req.body.ICD];

    await history.updateOne({ dateOfChangedDiagnosis: newData,  changeOfDiagnosis: newDs, ICD: newICD});
    res.redirect(`/edit/${id}`);
});

router.delete('/:id/change/remove', async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newDate = [...history.dateOfChangedDiagnosis.slice(0, history.dateOfChangedDiagnosis.length - 1)];
    const newDs = [...history.changeOfDiagnosis.slice(0, history.changeOfDiagnosis.length - 1)];
    const newICD = [...history.ICD.slice(0, history.ICD.length - 1)];

    await history.updateOne({ dateOfChangedDiagnosis: newDate,  changeOfDiagnosis: newDs, ICD: newICD});
    res.redirect(`/edit/${id}`);
});

router.put('/:id/concomitantDisease/add', async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newData = [...history.concomitantDisease, req.body.concomitantDisease];
    await history.updateOne({ concomitantDisease: newData });
    res.redirect(`/edit/${id}`);
});

router.delete('/:id/concomitantDisease/remove', async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newData = [...history.concomitantDisease.slice(0, history.concomitantDisease.length - 1)];
    await history.updateOne({ concomitantDisease: newData });
    res.redirect(`/edit/${id}`);
});

router.put('/:id/action/add', async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newData = [...history.action, req.body.action];
    const newDateStart = [...history.actionStart, req.body.actionStart];
    const newDateEnd = [...history.actionEnd, req.body.actionEnd];

    await history.updateOne({ action: newData,  actionStart: newDateStart, actionEnd: newDateEnd});
    res.redirect(`/edit/${id}`);
});

router.delete('/:id/action/remove', async (req, res) => {
    const id = req.params.id;
    const history = await History.findOne({patientId: id});
    const newData = [...history.action.slice(0, history.action.length - 1)];
    const newDateStart = [...history.actionStart.slice(0, history.actionStart.length - 1)];
    const newDateEnd = [...history.actionEnd.slice(0, history.actionEnd.length - 1)];

    await history.updateOne({ action: newData,  actionStart: newDateStart, actionEnd: newDateEnd});
    res.redirect(`/edit/${id}`);
});

router.get('/basic/:id', async (req, res) => {
    const id = req.params.id;
    const patient = await Patient.findById(id);
    res.render('patient-edit-basic', {
        patient
    });
});

router.patch('/basic/ill/:id', async (req, res) => {
    const id = req.params.id;
    const ill = req.body.ill || "Вы забыли указать болезнь";
    await Patient
        .findById({ _id: id })
        .updateOne({ ill });
    
    res.redirect(`/edit/basic/${id}`);
});

router.patch('/basic/ICD/:id', async (req, res) => {
    const id = req.params.id;
    const ICD = req.body.ICD || "Вы забыли указать болезнь";
    await Patient
        .findById({ _id: id })
        .updateOne({ ICD });
    
    res.redirect(`/edit/basic/${id}`);
});

router.patch('/basic/dateOfCompletion/:id', async (req, res) => {
    const id = req.params.id;
    const dateOfCompletion = req.body.dateOfCompletion || "Вы забыли указать болезнь";
    await Patient
        .findById({ _id: id })
        .updateOne({ dateOfCompletion });
    
    res.redirect(`/edit/basic/${id}`);
});
router.patch('/basic/dateOfStartObservation/:id', async (req, res) => {
    const id = req.params.id;
    const dateOfStartObservation = req.body.dateOfStartObservation || "Вы забыли указать болезнь";
    await Patient
        .findById({ _id: id })
        .updateOne({ dateOfStartObservation });
    
    res.redirect(`/edit/basic/${id}`);
});
router.patch('/basic/order/:id', async (req, res) => {
    const id = req.params.id;
    const order = req.body.order || "Вы забыли указать болезнь";
    await Patient
        .findById({ _id: id })
        .updateOne({ order });
    
    res.redirect(`/edit/basic/${id}`);
});
router.patch('/basic/multiplisityOfFillingCard/:id', async (req, res) => {
    const id = req.params.id;
    const multiplisityOfFillingCard = req.body.multiplisityOfFillingCard|| "Вы забыли указать болезнь";
    await Patient
        .findById({ _id: id })
        .updateOne({ multiplisityOfFillingCard });
    
    res.redirect(`/edit/basic/${id}`);
});
router.patch('/basic/phone/:id', async (req, res) => {
    const id = req.params.id;
    const phone = req.body.phone || "Вы забыли указать болезнь";
    await Patient
        .findById({ _id: id })
        .updateOne({ phone });
    
    res.redirect(`/edit/basic/${id}`);
});

router.patch('/basic/adres/:id', async (req, res) => {
    const id = req.params.id;
    const { city, street, house, room } = req.body;
    await Patient
        .findById({ _id: id })
        .updateOne({ city, street, house, room });
    
    res.redirect(`/edit/basic/${id}`);
});

router.delete('/remove/:id', async (req, res) => {
    const id = req.params.id;
    await Patient.findByIdAndDelete({_id: id});
    await History.findOneAndDelete({patientId: id});
    res.redirect('/list');
});

module.exports = router;