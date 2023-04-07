import express from 'express';
import patientService from '../services/patientService';
import {toNewPatient, toNewEntry} from '../utils';

const router = express.Router();

router.get('/',(_req,res)=>{
    res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id', (req,res)=>{
    const id = req.params.id;
    res.send(patientService.getPatient(id));
});

router.post('/', (req,res)=>{
    try{
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.createPatient(newPatient);
    return res.json(addedPatient);
    }
    catch(error:unknown){
        let errorMessage = 'Error:';
        if (error instanceof Error) {
        errorMessage += error.message;
        }
        return res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries',(req,res)=>{
    try{
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(req.params.id,newEntry);
        return res.json(addedEntry);
    } catch(error:unknown){
        if (error instanceof Error) {
            return res.status(400).send(error.message);
        }
        return res.status(400).send(error);
    }
});

export default router;

