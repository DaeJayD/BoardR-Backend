import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { MapPin, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Cagayan de Oro cityscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold font-display text-sm font-semibold mb-6 backdrop-blur-sm border border-gold/30">
            For CDO Students
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.08] text-primary-foreground mb-6">
            Find Your
            <br />
            <span className="text-gold">Perfect Pad</span>
            <br />
            Near Campus
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 font-body max-w-lg mb-10 leading-relaxed">
            No more outdated listings. No more scams. BOARDR shows you real-time
            verified rentals within walking distance of your school.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Button size="lg" className="bg-gold text-foreground hover:bg-gold/90 font-display font-semibold text-base px-8 h-13 shadow-elevated">
              Browse Listings
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-display font-semibold text-base px-8 h-13 backdrop-blur-sm">
              List Your Property
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 text-primary-foreground/70 text-sm font-body">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gold" />
              Real-Time Availability
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              Proximity Filters
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold" />
              Verified Landlords
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
