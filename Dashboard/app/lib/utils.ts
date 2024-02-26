import type { Patient, Patients } from './definitions';

const MAX_AGE = 16;

const MIN_AGE_MALE = 11;
const MAX_AGE_MALE = 13;

const MIN_AGE_FEMALE = 7;
const MAX_AGE_FEMALE = 9;

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

const getAge = (date: string) => {
  return new Date().getFullYear() - new Date(date).getFullYear();
};

export const isDateInRange = (min: number, max: number, date: string) => {
  const age = getAge(date);
  return age >= min && age <= max;
};

const getStatus = (date: string, max: number) => {
  const age = getAge(date);
  return age <= max;
};

const addYears = (date: string, years: number) => {
  let result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

const getOverdueVaccinationDate = (patient: Patient) => {
  const { vaccinationDate, birthDate, sex } = patient;
  if (!vaccinationDate) return false;
  let vaccination = new Date(vaccinationDate);
  let birth = new Date(vaccinationDate);
  const start =
    sex === 'male'
      ? addYears(birthDate, MAX_AGE_MALE)
      : addYears(birthDate, MAX_AGE_FEMALE);
  return vaccination >= birth && vaccination <= start;
};

const inRage = (patient: Patient) => {
  const { sex, birthDate } = patient;
  return sex === 'male'
    ? isDateInRange(MIN_AGE_MALE, MAX_AGE_MALE, birthDate)
    : isDateInRange(MIN_AGE_FEMALE, MAX_AGE_FEMALE, birthDate);
};

const underRage = (patient: Patient) => {
  const { sex, birthDate } = patient;
  const age = getAge(birthDate);
  return sex === 'male' ? MIN_AGE_MALE > age : MIN_AGE_FEMALE > age;
};

const getVaccinatedStatus = (patient: Patient) => {
  const { sex, isVaccinated, birthDate, vaccinationDate } = patient;

  if (isVaccinated && vaccinationDate) {
    return 'bg-orange-400';
  }

  if (isVaccinated) {
    return 'bg-blue-400';
  }

  const validDate = getOverdueVaccinationDate(patient);
  const underAge = underRage(patient);
  if (underAge) {
    return 'bg-green-400';
  }

  if (sex === 'male') {
    return isDateInRange(MIN_AGE_MALE, MAX_AGE_MALE, birthDate)
      ? 'bg-yellow-400'
      : !validDate
      ? 'bg-red-400'
      : 'bg-orange-400';
  } else {
    return isDateInRange(MIN_AGE_FEMALE, MAX_AGE_FEMALE, birthDate)
      ? 'bg-yellow-400'
      : !validDate
      ? 'bg-red-400'
      : 'bg-orange-400';
  }
};

const vaccinatedAtAge = (vaccinationDate: string, birthDate: string) => {
  return (
    new Date(vaccinationDate).getFullYear() - new Date(birthDate).getFullYear()
  );
};

export const getValidPatients = (patients: Patient[]) => {
  return patients.filter((patient: Patient) =>
    getStatus(patient.birthDate, MAX_AGE),
  );
};

export const getPatientsFormatted = (patients: Patient[]): Patients[] => {
  return patients.map((patient: Patient) => {
    const {
      birthDate,
      firstName,
      lastName,
      isVaccinated,
      vaccinationDate,
      sex,
    } = patient;
    const id = `${firstName}_${lastName}_${birthDate}`;
    const localPatient = getLocalPatients('patients', id);
    if (localPatient) {
      return {
        ...localPatient,
        vaccinationDate: localPatient.vaccinationDate
          ? formatDateToLocal(localPatient.vaccinationDate)
          : '',
        vaccinatedAtAge:
          localPatient.isVaccinated && localPatient.vaccinationDate
            ? vaccinatedAtAge(localPatient.vaccinationDate, birthDate)
            : null,
        vaccinatedStatus: getVaccinatedStatus({
          ...localPatient,
          isVaccinated: localPatient.isVaccinated === 'Yes' ? true : false,
        }),
      };
    }
    return {
      ...patient,
      id,
      name: `${firstName} ${lastName}`,
      age: getAge(birthDate),
      vaccinatedStatus: getVaccinatedStatus(patient),
      image_url: getRandomImage(sex),
      inRange: inRage(patient),
      href: `/dashboard/patient/?${id}`,
      href_vaccination: `/dashboard/schedule/?${id}`,
      isVaccinated: isVaccinated ? 'Yes' : 'No',
      birthDate: formatDateToLocal(birthDate),
      sex: sex === 'male' ? 'Male' : 'Female',
      vaccinationDate: vaccinationDate
        ? formatDateToLocal(vaccinationDate)
        : '',
      vaccinatedAtAge:
        isVaccinated && vaccinationDate
          ? vaccinatedAtAge(vaccinationDate, birthDate)
          : null,
    };
  });
};

export const getRandomImage = (sex: string) => {
  const male = ['steven-tey.png', 'lee-robinson.png', 'guillermo-rauch.png'];
  const female = ['amy-burns.png', 'delba-de-oliveira.png', 'steph-dietz.png'];
  const randomNumber = Math.floor(Math.random() * 3);
  if (sex === 'male') {
    return `/patients/${male[randomNumber]}`;
  } else {
    return `/patients/${female[randomNumber]}`;
  }
};

export const paginateArray = (inputArray: Patient[], subArraySize: number) => {
  let result = [];
  for (let i = 0; i < inputArray.length; i += subArraySize) {
    result.push(inputArray.slice(i, i + subArraySize));
  }
  return result;
};

const getLocalPatients = (key: string, id: string) => {
  const localPatients = localStorage.getItem(key);
  if (localPatients) {
    const patients = JSON.parse(localPatients);
    const updatedPatients = patients?.find(
      (patient: Patients) => patient.id === id,
    );
    return updatedPatients || null;
  }
  return null;
};

export const updateLocalStorage = (key: string, value: Patients) => {
  const localPatients = localStorage.getItem(key);
  const isInLocalStore = getLocalPatients(key, value.id);
  if (localPatients && isInLocalStore) {
    const patients = JSON.parse(localPatients);
    const updatedPatients = patients.map((patient: Patients) => {
      if (patient.id === value.id) {
        return value;
      }
      return patient;
    });
    localStorage.setItem(key, JSON.stringify(updatedPatients));
    return;
  }
  if (localPatients && !isInLocalStore) {
    const patients = JSON.parse(localPatients);
    patients.push(value);
    localStorage.setItem(key, JSON.stringify(patients));
    return;
  }
  localStorage.setItem(key, JSON.stringify([value]));
};
