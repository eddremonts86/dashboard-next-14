// Definition of types used in the app
export interface Patient {
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: string;
  isVaccinated: boolean;
  vaccinationDate: string | null;
}
export interface Patients extends Omit<Patient, 'isVaccinated'> {
  id: string;
  name: string;
  age: number;
  vaccinatedStatus: string;
  inRange: boolean;
  vaccinatedAtAge: number | null;
  href: string;
  image_url: string;
  href_vaccination: string;
  isVaccinated: string;
}

export interface PatientsResult {
  pages: number;
  total: number;
  data: Patients[];
}

export interface MenuLinks {
  name: string;
  href: string;
  icon: any;
}
