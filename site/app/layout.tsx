import type { Metadata, Viewport } from 'next';
import { Geist, Martian_Mono } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import './neon.css';
import { site } from '@/lib/site';
import { themeBootScript } from '@/lib/theme';

const geist = Geist({ subsets: ['latin', 'latin-ext'], variable: '--font-geist', display: 'swap' });
const martian = Martian_Mono({ subsets: ['latin', 'latin-ext'], axes: ['wdth'], variable: '--font-martian', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: '%s · Oliver Zingg' },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: { type: 'website', siteName: site.name, title: site.title, description: site.description, images: [`${site.url}/images/oliver.jpg`] },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8f6' },
    { media: '(prefers-color-scheme: dark)', color: '#111317' },
  ],
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${martian.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
