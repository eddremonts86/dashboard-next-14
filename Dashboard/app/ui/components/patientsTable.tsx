import type { Patients } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

export default async function PatientsTable({
  patients,
}: {
  patients: Patients[];
}) {
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {patients?.map((patient) => (
                  <div
                    key={patient.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={patient.image_url}
                              className="rounded-full"
                              alt={`${patient.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{patient.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{patient.sex}</p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pending</p>
                        <p className="font-medium">{patient.birthDate}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Paid</p>
                        <p className="font-medium">{patient.isVaccinated}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{patient.vaccinationDate} invoices</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full overflow-y-auto rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-5 text-center font-medium"
                    >
                      Sex
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Birth Date/Age
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Vaccination
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-5 text-center font-medium"
                    >
                      Vaccinated
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-5 text-center font-medium"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="divide-y divide-gray-200 overflow-auto text-gray-900"
                  style={{ height: '40vh' }}
                >
                  {patients.map((patient) => (
                    <tr key={patient.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Link key={patient.name} href={patient.href}>
                            <Image
                              src={patient.image_url}
                              className="mr-2 inline-flex rounded-full"
                              alt={`${patient.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <span>{patient.name}</span>
                          </Link>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-center text-sm">
                        {patient.sex}
                      </td>

                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <span className="block">
                          Birth date: {patient.birthDate}
                        </span>
                        <span className="block">Age: {patient.age}</span>
                        <span className="block">
                          In age range: {patient.inRange ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <span className="block">
                          {patient.vaccinationDate || 'N/A'}
                        </span>
                        {patient.vaccinatedAtAge !== null && (
                          <span className="block">
                            At age of: {patient.vaccinatedAtAge} years
                          </span>
                        )}
                        {patient.vaccinatedAtAge === null &&
                          patient.inRange && (
                            <Link
                              key={patient.name}
                              href={patient.href_vaccination}
                            >
                              <button className="h-7 w-40 rounded-md bg-blue-600 text-sm text-white">
                                Create an appointment
                              </button>
                            </Link>
                          )}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-center text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {patient.isVaccinated}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-center text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md ">
                        <span
                          className={`${patient.vaccinatedStatus} whitespace-nowrap rounded-lg ps-4 `}
                        ></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
