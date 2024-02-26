'use client';
import Search from '@/app/ui/components/search';
import { useState } from 'react';

import { getPatients } from '@/app/lib/data';
import type { PatientsResult } from '@/app/lib/definitions';
import PatientsTable from '@/app/ui/components/patientsTable';

export function Overview() {
  const [page, setPage] = useState(0);
  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
  };
  const patients: PatientsResult = getPatients({ page });
  const { pages, total, data } = patients;
  return (
    <>
      <Search
        placeholder="Search patients..."
        pages={pages}
        total={total}
        onPageChange={handlePageChange}
      />
      <PatientsTable patients={data} />
    </>
  );
}
