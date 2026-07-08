import Hero from '../../shared/ui/components/Hero/Hero';
import NetworkDiagnostics from '../../shared/ui/components/NetworkDiagnostics/NetworkDiagnostics';
import ContactSection from '../../shared/ui/components/ContactSection/ContactSection';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing-layout bg-background-base text-text-base min-h-screen relative">
      {/* Premium Floating Ambient Glow Orbs */}
      <div className="glow-orb glow-orb-primary top-[10%] left-[5%]" />
      <div className="glow-orb glow-orb-accent top-[40%] right-[5%]" />
      <div className="glow-orb glow-orb-primary bottom-[15%] left-[15%]" />

      {/* Landing body blocks */}
      <div className="relative z-10">
        <Hero />
        <NetworkDiagnostics />
        <ContactSection />
      </div>
    </div>
  );
}
