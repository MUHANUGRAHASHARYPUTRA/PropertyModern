import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Subsidi from '@/components/Subsidi';
import Komersil from '@/components/Komersil';
import Galeri from '@/components/Galeri';
import Kpr from '@/components/Kpr';
import Statistik from '@/components/Statistik';
import Timeline from '@/components/Timeline';
import MapSection from '@/components/MapSection';
import Testimonial from '@/components/Testimonial';
import Faq from '@/components/Faq';
import Kontak from '@/components/Kontak';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import CustomCursor from '@/components/CustomCursor';
import PageLoader from '@/components/PageLoader';
import CompareModal from '@/components/CompareModal';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <PageLoader />
      <CustomCursor />
      <Navbar />
      
      <Hero />
      <Subsidi />
      <Komersil />
      <Galeri />
      <Timeline />
      <Kpr />
      <Statistik />
      <MapSection />
      <Testimonial />
      <Faq />
      <Kontak />
      
      <Footer />
      <FloatingContact />
      <CompareModal />
    </main>
  );
}
