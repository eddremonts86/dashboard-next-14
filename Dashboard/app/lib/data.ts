import { patients as basePatients } from './base-data';
import type { Patient } from './definitions';
import { PatientsResult } from './definitions';
import { getPatientsFormatted, getValidPatients, paginateArray } from './utils';

export async function getPatients({
  itemByPage = 7,
  page = 0,
}): Promise<PatientsResult> {
  /*try {
    const API_BASE_URL = 'http://localhost:5000/';
    let allPatients = basePatients;
    const response = await fetch(`${API_BASE_URL}patients`);
    allPatients = await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }*/
  

  const patients: Patient[] = getValidPatients(basePatients);
  const patientsPaginated = paginateArray(patients, itemByPage);
  return {
    pages: patientsPaginated.length,
    total: patients.length,
    data: getPatientsFormatted(patientsPaginated[page]),
  };
}
