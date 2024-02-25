import { getPatients } from '@/app/lib/data';
import PatientsTable from '@/app/ui/components/patientsTable';
export async function Overview() {
  const patients = await getPatients();
  return (
    <>
      <PatientsTable patients={patients} />
    </>
  );
}
