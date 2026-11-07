import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchDialog from '@/components/SearchDialog';
import NeonSky from '@/components/NeonSky';

export default function NotFound() {
  return (
    <>
      <NeonSky />
      <Header />
      <main id="main" className="wrap nf">
        <pre aria-hidden><span className="err">Error in readRDS(&quot;page.rds&quot;): cannot open file</span>{'\n'}No such page on oliver-zingg.ch.</pre>
        <h1 className="h-page">This page moved or never existed.</h1>
        <p className="lede">The site was rebuilt in 2026, so old links from the Quarto version may point nowhere. Everything is still here.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" href="/">Home</Link>
          <Link className="btn btn-ghost" href="/projects/">Projects</Link>
          <Link className="btn btn-ghost" href="/wiki/">Knowledge base</Link>
        </div>
      </main>
      <Footer />
      <SearchDialog />
    </>
  );
}
