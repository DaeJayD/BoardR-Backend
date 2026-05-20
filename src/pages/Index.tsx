import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Shield, Zap, ArrowRight, ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { mockListings } from "@/lib/mockData";
import ListingCard from "@/components/ListingCard";
import ProblemSection from "@/components/ProblemSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";

const featuredListings = mockListings.filter((l) => l.available && l.verified).slice(0, 3);

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/listings");
  };

  return (
    <>

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Cagayan de Oro cityscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 text-gold font-display text-sm font-semibold mb-8 backdrop-blur-sm border border-gold/20"
            >
              Finding your home away from home
            </motion.span>

            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.05] text-primary-foreground mb-6 tracking-tight">
              Find Your<br />
              <span className="text-gold">Perfect Pad</span><br />
              Near Campus
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/75 font-body max-w-lg mb-10 leading-relaxed">
              No more outdated listings. No more scams. Real-time verified rentals within walking distance of your school.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleSearch}
                size="lg"
                className="bg-gold text-foreground hover:bg-gold/90 font-display font-semibold text-base px-8 h-13 shadow-elevated gap-2"
              >
                Browse Listings <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-display font-semibold text-base px-8 h-13 backdrop-blur-sm"
                onClick={() => navigate("/add-listing")}
              >
                List Your Property
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 text-primary-foreground/60 text-sm font-body mt-8">
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gold" /> Real-Time Availability</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> Proximity Filters</div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-gold" /> Verified Landlords</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-primary-foreground/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
            <div>
              <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Featured</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-2 text-foreground">Verified Rentals Near You</h2>
              <p className="text-muted-foreground font-body mt-2">Handpicked listings verified by our team</p>
            </div>
            <Link to="/listings">
              <Button variant="ghost" className="text-primary font-display gap-2 hidden sm:flex group">
                View All <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <Link to="/listings" className="sm:hidden">
            <Button variant="outline" className="w-full mt-8 font-display gap-2">
              View All Listings <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <ProblemSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
      
    </>
  );
};

export default Index;
