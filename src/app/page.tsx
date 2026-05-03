import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import Testimonials from "@/components/Testimonials";
import Menu from "@/components/Menu";
import Stylist from "@/components/Stylist";
import Gallery from "@/components/Gallery";
import Access from "@/components/Access";
import ReservationCTA from "@/components/ReservationCTA";
import Footer from "@/components/Footer";
import FloatingReservation from "@/components/FloatingReservation";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Concept />
      <Testimonials />
      <Menu />
      <Stylist />
      <Gallery />
      <Access />
      <ReservationCTA />
      <Footer />
      <FloatingReservation />
    </main>
  );
}
