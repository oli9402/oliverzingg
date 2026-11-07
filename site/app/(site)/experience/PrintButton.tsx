'use client';
import { Print } from '@/components/Icons';

export default function PrintButton() {
  return <button className="btn btn-ink" onClick={() => window.print()}><Print /> Save as PDF</button>;
}
