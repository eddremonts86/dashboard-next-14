import { patients as basePatients } from './base-data';
import type { Patient, Patients, PatientsResult } from './definitions';
import {
  getPatientsFormatted,
  getTime,
  getValidPatients,
  paginateArray,
} from './utils';

export function getPatients({ itemByPage = 7, page = 0 }): PatientsResult {
  try {
    /*
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
  } catch (error) {
    console.error(error);
  }
}

export function getPatient(id: string): Patients {
  const searchParams = id.split('_');

  let patient = basePatients?.find((patient) => {
    const dates =
      getTime(patient.birthDate) === parseInt(searchParams[2]).toString();
    return (
      patient.firstName === searchParams[0] &&
      patient.lastName === searchParams[1] &&
      dates
    );
  });

  let data: Patients = {} as Patients;
  if (patient) {
    data = getPatientsFormatted([patient])[0];
  }
  return data;
}
