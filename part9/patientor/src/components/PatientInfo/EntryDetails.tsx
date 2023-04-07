import HospitalEntry from "./HospitalEntryComponent";
import HealthCheckEntryComponent from "./HealthCheckEntryComponent";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntryComponent";
import { Entry, Diagnosis } from "../../types";
import { useState, useEffect } from "react";
import diagnoseService from "../../services/diagnoses";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);
  useEffect(() => {
    diagnoseService.getAll().then((response) => setDiagnosisCodes(response));
  }, []);

  const codeList = (entry:Entry)=>{
    let diagnosis = entry.diagnosisCodes?.map((code) => {
      const match = diagnosisCodes.find((d) => d.code === code);
      if (match) {
        return (
          <li key={match.code}>
            {match.code} {match.name}
          </li>
        );
      }
      return null;
    });
    return diagnosis;
  }
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} codeList={codeList} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} codeList={codeList} />;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} codeList={codeList} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
