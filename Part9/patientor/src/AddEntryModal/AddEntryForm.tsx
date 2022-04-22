import React from "react";
import { Grid, Button } from "@mui/material";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, HealthCheckRatingOption } from "./FormField";
import { HealthCheckEntry } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id" | "entries">;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}


const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: 1, label: "*" },
  { value: 2, label: "**" },
  { value: 3, label: "***" },
  { value: 4, label: "****" },  
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        healthCheckRating: 1
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
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
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
            <Field
              label="Type"
              placeholder="HealthCheck"
              name="type"
              component={TextField}
            />
            <Field
              label="Health Rating"
              placeholder="Rating 1-4"
              name="healthCheckRating"
              component={TextField}
            />
            <SelectField label="Health Rating" name="healthCheckRating" options={healthCheckRatingOptions} />
            
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
  );
};

export default AddEntryForm;
