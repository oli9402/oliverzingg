import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
    <Header />
    <main id="main" className="wrap nf">
      <h1 className="h-page">This page moved or never existed.</h1>
      <p className="lede">The site was rebuilt in 2026, so old links from the Quarto version may point nowhere. Everything is still here.</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link className="btn btn-ink" href="/">Home</Link>
        <Link className="btn btn-ghost" href="/projects/">Projects</Link>
        <Link className="btn btn-ghost" href="/wiki/">Knowledge base</Link>
      </div>
    </main>
    <Footer />
    </>
  );
}
