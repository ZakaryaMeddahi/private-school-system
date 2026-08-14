import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/nav-bar/NavBar';

export default function RootLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
