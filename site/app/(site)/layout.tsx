import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchDialog from '@/components/SearchDialog';
import SecretCode from '@/components/SecretCode';

/** Shell for every regular page. The neon page (app/neon) brings its own. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <SearchDialog />
      <SecretCode />
    </>
  );
}
