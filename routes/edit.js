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

module.exports = router;