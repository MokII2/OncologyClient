export interface User {
  id: string;
  username: string;
  role: 'normal' | 'super' | 'admin';
}

export interface Patient {
  id: string;
  hospitalNumber: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  diagnosis: string;
  stage: string;
  diagnosisDate: string;
  contactInfo: string;
  medicalHistory: string;
}

export interface TreatmentRecord {
  id: string;
  patientId: string;
  treatmentPlan: string;
  treatmentDate: string;
  treatmentEffect: string;
}