import Image from 'next/image';

export default function Logo() {
  return (
    <div>
      <Image
        src="/logo.svg"
        alt="logo"
        className="mr-4"
        width={100}
        height={32}
      />
    </div>
  );
}
