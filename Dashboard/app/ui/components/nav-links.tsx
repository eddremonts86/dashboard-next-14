'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { links } from '@/app/lib/dashboardManuLink';
import type { MenuLinks } from '@/app/lib/definitions';

function activeLink(name: string, pathname: string) {
  const style =
    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ';
  if (pathname === name) {
    return `${style} text-blue-600`;
  }
  return style;
}

export default function NavLinks() {
  const pathname = usePathname();
  const menu = links();
  return (
    <>
      {menu.map((link: MenuLinks) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={activeLink(link.href, pathname)}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
