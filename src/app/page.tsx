import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import FalsificationTypes from "@/components/sections/FalsificationTypes";
import AreasOfAction from "@/components/sections/AreasOfAction";
import Benefits from "@/components/sections/Benefits";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <FalsificationTypes />
      <AreasOfAction />
      <Benefits />
      <Contact />
      <Footer />
    </main>
  );
}
