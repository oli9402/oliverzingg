import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchDialog from '@/components/SearchDialog';
import NeonSky from '@/components/NeonSky';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NeonSky />
      <a href="#main" className="skip">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <SearchDialog />
    </>
  );
}
