import { OccupationalHealthcareEntry, Entry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcareEntryComponent: React.FC<{
  entry: OccupationalHealthcareEntry;
  codeList: (entry: Entry) => (JSX.Element | null)[] | undefined;
}> = ({ entry, codeList }) => {
  return (
    <div className="entry">
      {entry.date} <WorkIcon /> <em>{entry.employerName}</em> <br />
      <em>{entry.description}</em>
      <br />
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>{codeList(entry)}</ul>
      )}
      {entry.sickLeave && (
        <>
          sick leave: {entry.sickLeave?.startDate} ~ {entry.sickLeave?.endDate}
          <br />
        </>
      )}
      diagnose by {entry.specialist}
    </div>
  );
};

export default OccupationalHealthcareEntryComponent;
