import Logo from '@/app/ui/global/logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex items-center rounded-3xl bg-gray-100 py-4 pl-7 ">
        <Logo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 rounded-3xl  bg-black md:flex-row">
        <div className="flex items-center justify-center p-6 md:w-3/6 md:px-28 md:py-12">
          <Image
            src="/meet_out_platform.svg"
            alt="logo"
            className="mr-4"
            width={600}
            height="400"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 px-6 py-10 md:w-3/6 md:px-20">
          <p className={`text-xl text-white md:text-3xl md:leading-normal`}>
            <strong>Dawn Health</strong> in collaboration with
            <strong> Phoenix Corp</strong> has created an initiative to increase
            longevity among the younger generation and needs a patient handling
            system to keep track of the vaccination process.
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Our solution</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
    </main>
  );
}
