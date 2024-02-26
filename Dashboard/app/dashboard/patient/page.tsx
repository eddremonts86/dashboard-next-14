 import { Patient } from '@/app/dashboard/patient/Patient';
import { InvoicesTableSkeleton } from '@/app/ui/global/skeletons';
import { Suspense } from 'react';
export default function Page() {
  return (
    <>
      <h1 className="mb-8 text-xl md:text-2xl">Patient</h1>
      <Suspense
        fallback={
          <div>
            <InvoicesTableSkeleton />
          </div>
        }
      >
        <Patient />
      </Suspense>
    </>
  );
}
