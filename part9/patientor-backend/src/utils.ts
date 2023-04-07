import {
  NewPatient,
  Gender,
  Entry,
  NewEntry,
  Diagnosis,
  Discharge,
  HealthCheckRating,
  SickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorect ssn: " + ssn);
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect occupation: " + occupation);
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error("Incorrect entries: " + entries);
  }
  const isEntry = entries.every((entry: Entry): entry is Entry => {
    return ["OccupationalHealthcare", "Hospital", "HealthCheck"].includes(
      entry.type
    );
  });
  if (!isEntry) {
    throw new Error("Incorrect entries: " + entries);
  }
  return entries;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDescription = (desc: unknown): string => {
  if (!isString(desc)) {
    throw new Error("Incorrect description: " + desc);
  }
  return desc;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect specialist: " + specialist);
  }
  return specialist;
};

const parseDischargeCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error("Incorrect criteria for discharge: " + criteria);
  }
  return criteria;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("date" in discharge && "criteria" in discharge) {
    return {
      date: parseDate(discharge.date),
      criteria: parseDischargeCriteria(discharge.criteria),
    };
  }
  throw new Error("Incorrect discharge: " + discharge);
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number";
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parsehealthCheckRating = (rating: unknown): number => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect healthCheckRating: " + rating);
  }
  return Number(rating);
};

const parseEmployerName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect employer name: " + name);
  }
  return name;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect sickleave: " + object);
  }
  if ("startDate" in object && "endDate" in object) {
    return {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
  }
  throw new Error("Incorrect or missing data");
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  let baseEntry;
  if (
    "date" in object &&
    "description" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    baseEntry = {
      ...object,
      date: parseDate(object.date),
      description: parseDescription(object.description),
      specialist: parseSpecialist(object.specialist),
    };
    if ("diagnosisCodes" in object) {
      baseEntry = {
        ...baseEntry,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
    }
    switch (object.type) {
      case "Hospital":
        if ("discharge" in object) {
          const newEntry: NewEntry = {
            ...baseEntry,
            type: "Hospital",
            discharge: parseDischarge(object.discharge),
          };
          return newEntry;
        }
        break;
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          const newEntry: NewEntry = {
            ...baseEntry,
            type: "HealthCheck",
            healthCheckRating: parsehealthCheckRating(object.healthCheckRating),
          };
          return newEntry;
        }
        break;
      case "OccupationalHealthcare":
        let newEntry: NewEntry;
        if ("employerName" in object) {
          newEntry = {
            ...baseEntry,
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(object.employerName),
          };
          if ("sickLeave" in object) {
            newEntry = {
              ...newEntry,
              sickLeave: parseSickLeave(object.sickLeave),
            };
          }
          return newEntry;
        }
        break;
      default:
        break;
    }
  }
  throw new Error("Incorrect data: a field missing");
};
