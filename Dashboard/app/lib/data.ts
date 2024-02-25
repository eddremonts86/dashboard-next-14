import { patients as basePatients } from './base-data';
import { Patients } from './definitions';
import { getPatientsFormatted } from './utils';

const API_BASE_URL = 'http://localhost:5000/';
export async function getPatients(): Promise<Patients[]> {
  try {
    const response = await fetch(`${API_BASE_URL}patients`);
    const patients = await response.json();
    return getPatientsFormatted(patients);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return getPatientsFormatted(basePatients);
  }
}
