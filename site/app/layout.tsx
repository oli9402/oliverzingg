import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono, Press_Start_2P, VT323 } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import './theme-neon.css';
import './theme-neon-home.css';
import { site } from '@/lib/site';
import { themeBootScript } from '@/lib/theme';

const archivo = Archivo({ subsets: ['latin', 'latin-ext'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const pixel = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-pixel', display: 'swap' });
const vt = VT323({ weight: '400', subsets: ['latin'], variable: '--font-vt', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s · Oliver Zingg' },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: { type: 'website', siteName: site.name, title: site.title, description: site.description, images: [`${site.url}/images/oliver.jpg`] },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#07040f' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="neon" suppressHydrationWarning className={`${archivo.variable} ${mono.variable} ${pixel.variable} ${vt.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
