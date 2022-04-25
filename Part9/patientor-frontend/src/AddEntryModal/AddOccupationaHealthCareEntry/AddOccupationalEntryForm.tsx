import React from "react";
import { Grid, Button } from "@mui/material";
import { Field, Formik, Form } from "formik";

import { TextField } from "../FormField";
import { OccupationalHealthcareEntry } from "../../types";
import { DiagnosisSelection } from '../../AddPatientModal/FormField';
import { useStateValue } from '../../state';

export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id" | "entries">;

interface Props {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  onCancel: () => void;
}

export const AddOccupationalHealthcareEntryForm = ({ onSubmit, onCancel }: Props) => {
   const [{ diagnoses }] = useStateValue();
  return (
    <>
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "OccupationalHealthcare",
        employerName: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave?.startDate || values.sickLeave?.endDate) {
          if (values.sickLeave.startDate && !values.sickLeave.endDate) {
            errors.sickLeave = requiredError;
          }
          if (values.sickLeave.endDate && !values.sickLeave.startDate) {
            errors.sickLeave = requiredError;
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sickleave From"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sickleave To"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
      </Formik>
    </>
      
  );
};

export default AddOccupationalHealthcareEntryForm;
