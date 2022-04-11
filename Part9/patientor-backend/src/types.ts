export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
} 

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type PatientInput = Omit<Patient, 'id' | 'entries'>;

export enum Gender {
  Female = 'female',
  Male = 'male', 
  Other = 'other'
}