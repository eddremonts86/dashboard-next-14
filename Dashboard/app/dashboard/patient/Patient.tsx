'use client';
import { getPatient } from '@/app/lib/data';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function Patient() {
  const router = useSearchParams();
  const patient = getPatient(router.toString());
  console.log(patient);
  const appointmentButton =
    patient.vaccinatedStatus === 'bg-green-400' ||
    patient.vaccinatedStatus === 'bg-yellow-400';

  return (
    <section className="flex flex-grow  flex-row rounded-xl bg-gray-50 px-8 py-8 md:px-16 md:py-16">
      <div className="w-128 md:w-160 flex flex-col items-start justify-start px-5">
        <Image
          src={patient.image_url}
          className="rounded-full"
          alt={`${patient.name}'s profile picture`}
          width={128}
          height={128}
        />
      </div>
      <div className="w-128 md:w-160 flex flex-col items-start justify-start px-5">
        <h3 className="pb-4 text-xl md:text-2xl">General Information</h3>
        <p>
          <b className="pr-1">Name:</b>
          {patient.name}
        </p>
        <p>
          <b className="pr-1">Sex: </b>
          {patient.sex}
        </p>
        <p>
          <b className="pr-1">Birth Date:</b> {patient.birthDate}
        </p>
        <p>
          <b className="pr-1">Age:</b> {patient.age}
        </p>
      </div>
      <div className="w-128 md:w-160 flex flex-col items-start justify-start px-5">
        <h3 className="pb-4 text-xl md:text-2xl">Vaccination Information</h3>
        <p>
          <b className="pr-1">Vaccination date:</b>{' '}
          {patient.vaccinationDate || 'N/A'}
        </p>
        <p>
          <b className="pr-1">Vaccinated Status:</b>
          <span
            className={`${patient.vaccinatedStatus} whitespace-nowrap rounded-lg ps-5 `}
          ></span>
        </p>
        <p>
          <b className="pr-1">Vaccinated at age:</b> {patient.vaccinatedAtAge}
        </p>
        <p>
          <b className="pr-1">Is vaccinated:</b> {patient.isVaccinated}
        </p>
        <p>
          <b className="pr-1">In age range : </b>
          {patient.inRange ? 'Yes' : 'No'}
        </p>
      </div>
      {appointmentButton && (
        <div className="w-128 md:w-160 flex flex-col items-center justify-center px-5">
          <Link key={patient.name} href={patient.href_vaccination}>
            <button className="h-12 w-48 rounded-md bg-blue-600 text-white">
              Create an appointment
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
