import { Schedule } from '@/app/dashboard/schedule/Schedule';
import {
  InvoiceSkeleton,
  InvoicesTableSkeleton,
} from '@/app/ui/global/skeletons';
import { Suspense } from 'react';
export default function Page() {
  return (
    <>
      <h1 className="mb-8 text-xl md:text-2xl">Patients</h1>
      <Suspense
        fallback={
          <div>
            <InvoiceSkeleton />
            <InvoicesTableSkeleton />
          </div>
        }
      >
        <Schedule />
      </Suspense>
    </>
  );
}
