import React from "react";
import { Dialog, DialogContent, Divider, Box, Tabs, Tab, Typography } from "@mui/material";
import { Alert } from '@mui/material';
import AddOccupationalHealthcareEntryForm, { OccupationalHealthcareEntryFormValues } from "./AddOccupationaHealthCareEntryModal/AddOccupationalEntryForm";
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryModal/AddHospitalEntryForm';
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues } from './AddHealthCheckEntryModal/AddHealthCheckEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values:
    HospitalEntryFormValues |
    OccupationalHealthcareEntryFormValues |
    HealthCheckEntryFormValues) => void;
  error?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Hospital" {...a11yProps(0)} />
            <Tab label="Occupational" {...a11yProps(1)} />
            <Tab label="Healthcheck" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Typography variant="h5" mb={2}>Add a new hospital entry</Typography>
          <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h5" mb={2}>Add a new occupational healthcare entry</Typography>
          <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant="h5" mb={2}>Add a new healthcheck entry</Typography>
          <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
