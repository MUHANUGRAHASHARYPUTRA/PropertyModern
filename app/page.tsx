export const dynamic = 'force-dynamic';

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
import VideoTestimonial from '@/components/VideoTestimonial';
import Faq from '@/components/Faq';
import Kontak from '@/components/Kontak';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import PageLoader from '@/components/PageLoader';
import CompareModal from '@/components/CompareModal';
import GlobalCompareBar from '@/components/GlobalCompareBar';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <PageLoader />
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="subsidi">
        <Subsidi />
      </section>

      <section id="komersil">
        <Komersil />
      </section>

      <section id="galeri">
        <Galeri />
      </section>

      <Timeline />

      <section id="kpr">
        <Kpr />
      </section>

      <Statistik />

      <section id="lokasi">
        <MapSection />
      </section>

      <Testimonial />
      <VideoTestimonial />
      <Faq />

      <section id="kontak">
        <Kontak />
      </section>

      <Footer />
      <FloatingContact />
      <GlobalCompareBar />
      <CompareModal />
    </main>
  );
}