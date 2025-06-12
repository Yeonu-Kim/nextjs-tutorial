'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PATH } from '@/entities/path';

export const Navigation = () => {
  const path = usePathname();
  console.log(path);

  return (
    <nav className="flex gap-4 justify-end items-center h-20 px-4 border-b">
      <Link href={PATH.HOME}>Home {path === PATH.HOME && '✅'}</Link>
      <Link href={PATH.ABOUT_US}>
        About Us {path === PATH.ABOUT_US && '✅'}
      </Link>
    </nav>
  );
};
