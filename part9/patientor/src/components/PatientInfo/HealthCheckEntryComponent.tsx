import { HealthCheckEntry, Entry } from "../../types";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheckEntryComponent: React.FC<{
  entry: HealthCheckEntry;
  codeList: (entry: Entry) => (JSX.Element | null)[] | undefined;
}> = ({ entry, codeList }) => {
  let heartIconColor;
  switch (entry.healthCheckRating) {
    case 0:
      heartIconColor = "green";
      break;
    case 1:
      heartIconColor = "yellow";
      break;
    case 2:
      heartIconColor = "blue";
      break;
    case 3:
      heartIconColor = "red";
      break;
    default:
      heartIconColor = "black";
  }
  return (
    <div className="entry">
      {entry.date} <MedicalInformationIcon />
      <br />
      <em>{entry.description}</em>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && <ul>{codeList(entry)}</ul>}
      <br />
      <FavoriteIcon sx={{ color: heartIconColor }} />
      <br />
      diagnose by {entry.specialist}
    </div>
  );
};

export default HealthCheckEntryComponent;
