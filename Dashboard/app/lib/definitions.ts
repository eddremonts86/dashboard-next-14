// Definition of types used in the app
export type Patients = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  birthDate: string;
  sex: 'male' | 'female';
  isVaccinated: string;
  vaccinationDate: string | null;
  image_url: string;
  age: number;
  vaccinatedStatus: string;
  inRange: boolean;
  vaccinatedAtAge: number;
};

export type MenuLinks = {
  name: string;
  href: string;
  icon: any;
};
