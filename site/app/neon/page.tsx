'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setTheme } from '@/lib/theme';

/** Old link from when neon mode was a separate page: switch the theme on and go home. */
export default function NeonAlias() {
  const router = useRouter();
  useEffect(() => { setTheme('neon'); router.replace('/'); }, [router]);
  return null;
}
