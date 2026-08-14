import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/Nav Bar/NavBar';

export default function RootLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
