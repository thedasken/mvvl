import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: Parameters<typeof clsx>) => {
  return twMerge(clsx(inputs));
};

export function calculateAge(date: string | null): number | string {
  if (!date) return '-';
  const birth = new Date(date);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function formatDate(date: string | null): string {
  if (!date) return '-';
  const [y, m, d] = date.split('-');
  return `${d}-${m}-${y}`;
}
