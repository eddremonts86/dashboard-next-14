'use client';
import { patients as basePatients } from '@/app/lib/base-data';
import type { Patients } from '@/app/lib/definitions';
import { getPatientsFormatted } from '@/app/lib/utils';
import Image from 'next/image';

import { useSearchParams } from 'next/navigation';

export default function Patient() {
  const router = useSearchParams();
  const searchParams = router.toString().split('_');
  let patient = basePatients?.find((patient) => {
    return (
      patient.firstName === searchParams[0] &&
      patient.lastName === searchParams[1]
    );
  });
  let data: Patients = {} as Patients;
  if (patient) {
    data = getPatientsFormatted([patient])[0];
  }

  return (
    <div className="flex h-full flex-col rounded-md bg-gray-50 px-8 py-8 md:px-16 md:py-16">
      <Image
        src={data.image_url}
        className="rounded-full"
        alt={`${data.name}'s profile picture`}
        width={128}
        height={128}
      />
      <p className="text-sm text-gray-500">{data.sex}</p>
    </div>
  );
}
