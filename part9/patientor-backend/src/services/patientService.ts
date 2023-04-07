import patientData from "../../data/patients";
import { NonSensitivePatientData, NewPatient, Patient, NewEntry, Entry } from "../types";
import { v1 as uuid } from 'uuid';

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation, entries})=>({id, name, dateOfBirth, gender, occupation, entries}));
};

const getPatient = (id:string):Patient|undefined=>{
  return patientData.find(patient=>patient.id === id);
};

const createPatient = (patient:NewPatient):Patient=>{
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (patientId:string, entry:NewEntry):Entry=>{
  const newEntry = {
    id:uuid(),
    ...entry
  };
  const patient = patientData.find(patient=>patient.id===patientId);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {getNonSensitivePatientData, createPatient, getPatient, addEntry};