import { HomeIcon, CalendarIcon } from '@heroicons/react/24/outline';
import type { MenuLinks } from './definitions';

export function links(): MenuLinks[] {
  return [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    {
      name: 'Schedule',
      href: '/dashboard/schedule',
      icon: CalendarIcon,
    },
  ];
}
