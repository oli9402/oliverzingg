import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import { site } from '@/lib/site';

const archivo = Archivo({ subsets: ['latin', 'latin-ext'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s · Oliver Zingg' },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: { type: 'website', siteName: site.name, title: site.title, description: site.description, images: [`${site.url}/images/oliver.jpg`] },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#2340d9' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
