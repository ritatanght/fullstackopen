import { useState, useEffect } from "react";
import { Patient, Entry } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./EntryDetails";
import NewEntryForm from "./NewEntryForm";

const PatientInfo: React.FC<{ patient?: Patient | null }> = ({ patient }) => {
  const [entries, setEntries] = useState(patient?.entries || []);

  useEffect(() => {
    if (patient) {
      setEntries(patient?.entries);
    }
  }, [patient]);

  if (!patient) {
    return null;
  }

  let gender;
  switch (patient.gender) {
    case "male":
      gender = <MaleIcon />;
      break;
    case "female":
      gender = <FemaleIcon />;
      break;
    default:
      gender = <TransgenderIcon />;
  }

  const addEntry = (entry: Entry) => {
    console.log("Print new entry:", entry);
    setEntries(entries.concat(entry));
  };

  const entriesElements = entries.map((entry) => (
    <EntryDetails key={entry.id} entry={entry} />
  ));

  return (
    <>
      <h2>
        {patient.name} {gender}
      </h2>
      {patient.ssn ? `ssn:${patient.ssn}` : ""}
      occupation:{patient?.occupation}
      <NewEntryForm id={patient.id} addEntry={addEntry} />
      {patient.entries.length > 0 && <h3>Entries</h3>}
      {entriesElements}
    </>
  );
};

export default PatientInfo;
