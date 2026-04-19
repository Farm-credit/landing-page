import { Header, Hero, Solutions, HowItWorks, Footer } from "@/components/Home";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
