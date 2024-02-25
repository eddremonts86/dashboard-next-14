import { Patients } from './definitions';
const MAX_AGE = 16;
const MIN_AGE_MALE = 11;
const MAX_AGE_MALE = 13;
const MIN_AGE_FEMALE = 7;
const MAX_AGE_FEMALE = 9;

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

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

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
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

function addYears(date: string, years: number) {
  let result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

const getOverdueVaccinationDate = (patient: any) => {
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

const getVaccinatedStatus = (patient: any) => {
  const { sex, isVaccinated, birthDate } = patient;
  if (isVaccinated) {
    return 'blue';
  }
  const validDate = getOverdueVaccinationDate(patient);

  if (sex === 'male') {
    return isDateInRange(MIN_AGE_MALE, MAX_AGE_MALE, birthDate)
      ? 'Yellow'
      : !validDate
      ? 'red'
      : '';
  } else {
    return isDateInRange(MIN_AGE_FEMALE, MAX_AGE_FEMALE, birthDate)
      ? 'Yellow'
      : !validDate
      ? 'red'
      : '';
  }
};

const vaccinatedAtAge = (vaccinationDate: string , birthDate: string) => {
  return (
    new Date(vaccinationDate).getFullYear() - new Date(birthDate).getFullYear()
  );
};

export const getPatientsFormatted = (
  patients: any,
  itemPerPage = 50,
): Patients[] => {
  return patients
    .filter((patient: any) => getStatus(patient.birthDate, MAX_AGE))
    .map((patient: any) => {
      const {
        birthDate,
        firstName,
        lastName,
        isVaccinated,
        vaccinationDate,
        sex,
      } = patient;
      return {
        ...patient,
        id: `${firstName}-${lastName}-${birthDate}`,
        name: `${firstName} ${lastName}`,
        image_url: getRandomImage(sex),
        isVaccinated: isVaccinated ? 'Yes' : 'No',
        birthDate: formatDateToLocal(birthDate),
        vaccinationDate: vaccinationDate
          ? formatDateToLocal(vaccinationDate)
          : '',
        sex: sex === 'male' ? 'Male' : 'Female',
        age: getAge(birthDate),
        vaccinatedStatus: getVaccinatedStatus(patient),
        vaccinatedAtAge: isVaccinated
          ? vaccinatedAtAge(vaccinationDate, birthDate)
          : null,
        inRange:
          sex === 'male'
            ? isDateInRange(MIN_AGE_MALE, MAX_AGE_MALE, birthDate)
            : isDateInRange(MIN_AGE_FEMALE, MAX_AGE_FEMALE, birthDate),
      };
    })
    .slice(0, itemPerPage);
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
