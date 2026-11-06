'use client';
import { openSearch } from '@/components/SearchDialog';
import { Search } from '@/components/Icons';

export default function SearchButton({ label }: { label: string }) {
  return (
    <button className="btn btn-hi" onClick={openSearch}><Search /> {label} <kbd style={{ font: '500 12px var(--mono)', opacity: 0.7 }}>/</kbd></button>
  );
}
