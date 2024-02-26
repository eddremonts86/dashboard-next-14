'use client';
import { getPatient } from '@/app/lib/data';
import { updateLocalStorage } from '@/app/lib/utils';
import { useSearchParams, useRouter } from 'next/navigation';

export function Schedule() {
  const router = useSearchParams();
  const routerPush = useRouter();
  const patient = getPatient(router.toString());

  const inputClass =
    'peer block w-auto appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-black dark:focus:border-blue-500';

  const labelInputClass =
    'transhtmlForm absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-800 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500';

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const vaccinationDate = data.get('vaccinationDate');
    const date = new Date(vaccinationDate?.toString() || '');

    if (date.toString() === 'Invalid Date' || date < new Date()) {
      return alert('Invalid Date');
    }

    if (vaccinationDate) {
      patient.vaccinationDate = data.get('vaccinationDate')?.toString() || null;
      updateLocalStorage('patients', patient);
      routerPush.push(patient.href);
    }
  };

  return (
    <section className="flex flex-grow  flex-row rounded-xl bg-gray-50 px-8 py-8 md:px-16 md:py-16">
      <form
        className="flex w-auto flex-col items-start justify-start rounded-xl bg-gray-200 px-5 py-5"
        onSubmit={handleSubmit}
      >
        <div className="grid pb-5 md:grid-cols-4 md:gap-12">
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className={inputClass}
              value={patient.firstName}
              disabled
              required
            />
            <label htmlFor="floating_first_name" className={labelInputClass}>
              First name
            </label>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className={inputClass}
              value={patient.lastName}
              required
              disabled
            />
            <label htmlFor="floating_last_name" className={labelInputClass}>
              Last name
            </label>
          </div>
        </div>
        <div className="grid pb-5 md:grid-cols-4 md:gap-12">
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="text"
              name="birthDate"
              id="birthDate"
              className={inputClass}
              value={patient.birthDate}
              required
              disabled
            />
            <label htmlFor="birthDate" className={labelInputClass}>
              Birth date
            </label>
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <input
              type="text"
              name="vaccinationDate"
              id="vaccinationDate"
              className={inputClass}
              required
            />
            <label htmlFor="vaccinationDate" className={labelInputClass}>
              Vaccination Date(yyyy-mm-dd)
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
