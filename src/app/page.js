import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Banner from "@/components/sections/Banner";
import Featured from "@/components/sections/Featured";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Banner />
      <Featured />
      <Footer />
    </main>
  );
}
