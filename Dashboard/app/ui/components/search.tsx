
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({
  placeholder,
  pages,
  total,
  onPageChange,
}: {
  placeholder: string;
  pages: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const pageOptions = [];
  for (let i = 1; i <= pages; i++) {
    pageOptions.push(
      <option value={i} key={i}>
        Page {i}
      </option>,
    );
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      <select
        className="peer ml-3 block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={(e) => onPageChange(Number(e.target.value))}
      >
        {pageOptions}
      </select>
    </div>
  );
}
