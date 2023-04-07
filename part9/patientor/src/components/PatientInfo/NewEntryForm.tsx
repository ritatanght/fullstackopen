import { useState, useEffect } from "react";
import {
  Button,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Alert,
  Container,
} from "@mui/material";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import axios from "axios";
import { Diagnosis, Entry, Discharge } from "../../types";

const NewEntryForm: React.FC<{
  id: string;
  addEntry: (entry: Entry) => void;
}> = ({ id, addEntry }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [codeOptions, setCodeOptions] = useState<Diagnosis[]>([]);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([]);
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState({ startDate: "", endDate: "" });
  const [message, setMessage] = useState(null);
  const [type, setType] = useState<Entry["type"]>("HealthCheck");

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnosisList = await diagnoseService.getAll();
      setCodeOptions(diagnosisList);
    };
    void fetchDiagnosisList();
  }, []);

  const formSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      if (type === "HealthCheck") {
        const newEntry = await patientService.addEntry(id, {
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating,
        });
        addEntry(newEntry);
        setHealthCheckRating(0);
      } else if (type === "Hospital") {
        const newEntry = await patientService.addEntry(id, {
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge,
        });
        addEntry(newEntry);
        setDischarge({ date: "", criteria: "" });
      } else if (type === "OccupationalHealthcare") {
        if (sickLeave.startDate || sickLeave.endDate) {
          const newEntry = await patientService.addEntry(id, {
            type,
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName,
            sickLeave,
          });
          addEntry(newEntry);
        } else {
          const newEntry = await patientService.addEntry(id, {
            type,
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName,
          });
          addEntry(newEntry);
        }
        setEmployerName("");
        setSickLeave({ startDate: "", endDate: "" });
      }
      setMessage(null);
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes([]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data);
      }
    }
  };

  const clearAll = () => {
    if (type === "HealthCheck") {
      setHealthCheckRating(0);
    } else if (type === "Hospital") {
      setDischarge({ date: "", criteria: "" });
    } else if (type === "OccupationalHealthcare") {
      setEmployerName("");
      setSickLeave({ startDate: "", endDate: "" });
    }
    setMessage(null);
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
  };

  const displayForm = () => {
    if (type === "HealthCheck") {
      return (
        <>
          <InputLabel id="rating">Healthcheck rating</InputLabel>
          <RadioGroup
            value={healthCheckRating}
            row
            name="rating"
            aria-labelledby="rating"
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          >
            <FormControlLabel value="0" control={<Radio />} label="Healthy" />
            <FormControlLabel value="1" control={<Radio />} label="Low Risk" />
            <FormControlLabel value="2" control={<Radio />} label="High Risk" />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Critical Risk"
            />
          </RadioGroup>
        </>
      );
    } else if (type === "Hospital") {
      return (
        <>
          <InputLabel id="discharge">Discharge</InputLabel>
          <Container>
            <TextField
              label="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              variant="standard"
              value={discharge.date}
              onChange={(e) =>
                setDischarge({ ...discharge, date: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Criteria"
              variant="standard"
              value={discharge.criteria}
              onChange={(e) =>
                setDischarge({ ...discharge, criteria: e.target.value })
              }
            />
          </Container>
        </>
      );
    } else if (type === "OccupationalHealthcare") {
      return (
        <>
          <TextField
            fullWidth
            label="Employer"
            variant="standard"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
          <InputLabel id="sickleave">Sick Leave</InputLabel>
          <Container>
            <TextField
              label="start"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              variant="standard"
              value={sickLeave.startDate}
              onChange={(e) =>
                setSickLeave({ ...sickLeave, startDate: e.target.value })
              }
            />
            <TextField
              label="end"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              variant="standard"
              value={sickLeave.endDate}
              onChange={(e) =>
                setSickLeave({ ...sickLeave, endDate: e.target.value })
              }
            />
          </Container>
        </>
      );
    }
  };

  return (
    <div>
      {message && <Alert severity="error">{message}</Alert>}
      <form className="form">
        <InputLabel id="form-type">Form Type</InputLabel>
        <Select
          labelId="form-type"
          variant="standard"
          value={type}
          onChange={(e) => setType(e.target.value as Entry["type"])}
          label="Type"
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            OccupationalHealthcare
          </MenuItem>
        </Select>
        <h3>New {type} Entry</h3>
        <TextField
          fullWidth
          label="Description"
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          label="Date"
          variant="standard"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          fullWidth
          label="Specialist"
          variant="standard"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <InputLabel id="diagnosis-codes">Diagnosis codes</InputLabel>
        <Select
          fullWidth
          labelId="diagnosis-codes"
          multiple
          value={diagnosisCodes}
          renderValue={(selected) => selected.join(", ")}
          onChange={(e) =>
            setDiagnosisCodes(e.target.value as Array<Diagnosis["code"]>)
          }
        >
          {codeOptions.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.code} - {c.name}
            </MenuItem>
          ))}
        </Select>
        <br />
        {displayForm()}
        <div className="form-btn">
          <Button variant="contained" color="primary" onClick={formSubmit}>
            Add
          </Button>{" "}
          <Button variant="contained" color="error" onClick={clearAll}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewEntryForm;
