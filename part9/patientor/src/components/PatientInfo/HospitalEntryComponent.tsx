import { HospitalEntry, Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
const HospitalEntryComponent: React.FC<{
  entry: HospitalEntry;
  codeList: (entry: Entry) => (JSX.Element | null)[] | undefined;
}> = ({ entry, codeList }) => {
  return (
    <div className="entry">
      {entry.date} <LocalHospitalIcon />
      <br />
      {entry.description}
      <br />
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>{codeList(entry)}</ul>
      )}
      discharge: {entry.discharge.criteria} on {entry.discharge.date} <br />
      diagnose by {entry.specialist}
    </div>
  );
};

export default HospitalEntryComponent;
