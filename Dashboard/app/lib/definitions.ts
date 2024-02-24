// Definition of types used in the app
export type Patients = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  sex: 'male' | 'female';
  isVaccinated: Boolean;
  vaccinationDate: Date | null;
};
