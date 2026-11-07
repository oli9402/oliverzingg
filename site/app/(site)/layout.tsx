import { ViewTransition } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchDialog from '@/components/SearchDialog';
import SecretCode from '@/components/SecretCode';
import NeonBackdrop from '@/components/NeonBackdrop';
import NeonHud from '@/components/NeonHud';
import NeonFooter from '@/components/NeonFooter';
import Terminal from '@/components/Terminal';
import Dossier from '@/components/Dossier';
import { getProfile } from '@/lib/profile';

/** Shell for every page. Both themes' chrome is rendered; CSS shows the active one. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const profile = getProfile();
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <NeonBackdrop />
      <NeonHud />
      <Header />
      <main id="main">
        {/* page content swaps with a CRT switch-off/on (theme-neon.css: ::view-transition-*(.crt)) */}
        <ViewTransition default="crt">{children}</ViewTransition>
      </main>
      <Footer />
      <NeonFooter />
      <SearchDialog />
      <SecretCode />
      <Terminal profile={profile} />
      <Dossier profile={profile} />
    </>
  );
}
