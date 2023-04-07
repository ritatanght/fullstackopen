export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface SickLeave{
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    employerName: string;
    sickLeave?:SickLeave;
    type:"OccupationalHealthcare";

}
export interface Discharge{
    date:string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry{
    discharge:Discharge;
    type:"Hospital";
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry{
    healthCheckRating: HealthCheckRating;
    type: "HealthCheck";
}

export type Entry =   HospitalEntry  | OccupationalHealthcareEntry | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry,'id'>;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;