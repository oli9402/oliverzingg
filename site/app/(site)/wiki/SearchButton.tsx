'use client';
import { openSearch } from '@/components/SearchDialog';

export default function SearchButton({ label }: { label: string }) {
  return (
    <button className="btn btn-ghost" type="button" onClick={openSearch}><span style={{ color: 'var(--accent)' }}>&gt;</span> {label} <kbd>/</kbd></button>
  );
}
