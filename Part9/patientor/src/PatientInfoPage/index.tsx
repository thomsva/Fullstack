import axios from 'axios';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { addPatientData, useStateValue } from '../state';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Patient } from '../types';
import { Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import HealthRatingBar from '../components/HealthRatingBar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import CheckIcon from '@mui/icons-material/Check';
//TODO: entry type
import AddEntryModal from '../AddEntry/index';
//import { HealthCheckEntryFormValues } from '../AddEntry/AddHealthCheckEntryModal/AddHealthCheckEntryForm';
//import { HospitalEntryFormValues } from '../AddEntry/AddHospitalEntryModal/AddHospitalEntryForm';
import { OccupationalHealthcareEntryFormValues } from '../AddEntry/AddOccupationaHealthCareEntryModal/AddOccupationalEntryForm';
import { HospitalEntryFormValues } from '../AddEntry/AddHospitalEntryModal/AddHospitalEntryForm';
import { HealthCheckEntryFormValues } from '../AddEntry/AddHealthCheckEntryModal/AddHealthCheckEntryForm';

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const [error, setError] = React.useState<string>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // TODO: entry type
  const submitNewEntry = async (values:
    HospitalEntryFormValues |
    OccupationalHealthcareEntryFormValues |
    HealthCheckEntryFormValues) => {
    try {
      if (id !== undefined) {
        const { data: patientFromApi } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        console.log(patientFromApi);
        dispatch(addPatientData(patientFromApi as unknown as Patient));
        closeModal();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        // Error from backend
        setError(String(e?.response?.data) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id !== undefined) {
          // Only get data if ssn is missing
          if (patients[id] !== undefined){
            if (patients[id].ssn === undefined) {
              const { data: patientFromApi } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
              );
              dispatch(addPatientData(patientFromApi));
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital': return <HospitalEntryDetails entry={entry} />;
      case 'OccupationalHealthcare': return <OccupationalHealthcareDetails entry={entry} />;
      case 'HealthCheck': return <HealthCheckDetails entry={entry} />;
      default: return assertNever(entry);
      console.log('entry', entry);
    }
  };

  const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
      <Card variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item xs={6} >
              <Chip icon={<LocalHospitalIcon />} label="Hostpital" />
            </Grid>
            <Grid item xs={6} >
              <Typography variant="h6" align='right'>{entry.date}</Typography>
            </Grid>
          </Grid>
          <Typography>{entry.description}</Typography>
          <Typography>Specialist: {entry.specialist}</Typography>
          <Typography>Discharged on {entry.discharge.date} ({entry.discharge.criteria})</Typography>
          <Stack mt={1} spacing={1}>
            {entry.diagnosisCodes?.map(d => (
              <Chip size="small" key={d} label={d + ' ' + diagnoses[d].name} />
            ))}
          </Stack>
        </CardContent> 
      </Card>
    );
  };


  const OccupationalHealthcareDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
      <Card variant="outlined">
        <CardContent>
            <Grid container>
              <Grid item xs={6} >
                <Chip icon={<WorkIcon />} label="Occupational healthcare" />
              </Grid>
              <Grid item xs={6} >
                <Typography variant="h6" align='right'>{entry.date}</Typography>
              </Grid>
            </Grid>
            <Typography>{entry.description}</Typography>
            <Typography>Employer: {entry.employerName}</Typography>
            {(entry.sickLeave !== undefined)
              ? <Typography>Sickleave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}.</Typography>
              : <Typography>No sick leave.</Typography>}
            <Stack mt={1} spacing={1}>
              {entry.diagnosisCodes?.map(d => (
                <Chip size="small" key={d} label={d + ' ' + diagnoses[d].name} />
              ))}
            </Stack>
        </CardContent> 
      </Card>
    );
  };

  const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
      <Card variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item xs={6} >
              <Chip icon={<CheckIcon />} label="Health check" />
            </Grid>
            <Grid item xs={6} >
              <Typography variant="h6" align='right'>{entry.date}</Typography>
            </Grid>
          </Grid>
          <Typography>{entry.description}</Typography>
          <Typography>{entry.specialist}</Typography>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography>Health rating: </Typography>
            <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
          </div>
          <Stack mt={1} spacing={1}>
            {entry.diagnosisCodes?.map(d => (
              <Chip size="small" key={d} label={d + ' ' + diagnoses[d].name} />
            ))}
          </Stack>
      </CardContent> 
      </Card>
    );
  };
  
    
  if (!id) return (<div>patient id missing</div>);
  if (patients[id] === undefined)  return (<Navigate to='/' />);
  const patient = patients[id];
  
  return (

    <Card variant="outlined" sx={{ maxWidth:500, mt:3 }}>
      <CardContent>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography mr={2} variant="h4">{patient.name}</Typography>
          {(patient.gender === 'male')
            ? <MaleIcon />
            : (patient.gender === 'female')
              ? <FemaleIcon />
              : <TransgenderIcon />}
        </div>

        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>

        <Divider />
      
        <Grid container>
          <Grid item xs={8}>
            <Typography mt={2} variant="h5">Entries</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" sx={{ mb:2, mt:2 }} onClick={() => openModal()}>
              Add New Entry
            </Button>
          </Grid>
        </Grid>
        {(patient.entries !== undefined && patient.entries.length > 0)
          &&
          <Stack spacing={1}>
            {patient.entries.map(e => (<EntryDetails key={e.id} entry={e} />))}
          </Stack>
        }

      </CardContent>

      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onClose={closeModal}
        onSubmit={submitNewEntry}
      />

    </Card>
  );
};


export default PatientInfoPage;