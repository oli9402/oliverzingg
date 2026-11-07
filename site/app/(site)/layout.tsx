import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchDialog from '@/components/SearchDialog';
import SecretCode from '@/components/SecretCode';
import NeonBackdrop from '@/components/NeonBackdrop';
import NeonHud from '@/components/NeonHud';
import NeonFooter from '@/components/NeonFooter';

/** Shell for every page. Both themes' chrome is rendered; CSS shows the active one. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <NeonBackdrop />
      <NeonHud />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <NeonFooter />
      <SearchDialog />
      <SecretCode />
    </>
  );
}
