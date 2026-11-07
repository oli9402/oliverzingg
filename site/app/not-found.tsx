import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NeonHud from '@/components/NeonHud';
import NeonFooter from '@/components/NeonFooter';
import NeonBackdrop from '@/components/NeonBackdrop';
import Terminal from '@/components/Terminal';
import Dossier from '@/components/Dossier';
import SearchDialog from '@/components/SearchDialog';
import { getProfile } from '@/lib/profile';

export default function NotFound() {
  const profile = getProfile();
  return (
    <>
    <NeonBackdrop />
    <NeonHud />
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
    <NeonFooter />
    <Terminal profile={profile} />
    <Dossier profile={profile} />
    <SearchDialog />
    </>
  );
}
