import {
  InvoicesTableSkeleton,
  CardsSkeleton,
} from '@/app/ui/global/skeletons';
import { Suspense } from 'react';
import { Overview } from '@/app/dashboard/overview';
export default function Page() {
  return (
    <>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Overview />
      </Suspense>
      <CardsSkeleton />
    </>
  );
}
