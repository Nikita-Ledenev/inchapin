import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
import PageShell from "@/components/PageShell/PageShell";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <About />
    </PageShell>
  );
}
