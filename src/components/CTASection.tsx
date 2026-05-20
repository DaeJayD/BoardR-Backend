import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Stop Searching.<br />Start <span className="text-gold">Living.</span>
            </h2>
            <p className="text-primary-foreground/70 font-body text-lg max-w-lg mx-auto mb-10">
              Join BOARDR and find verified, available rentals near your campus in Cagayan de Oro City.
            </p>
            <Button size="lg" className="bg-gold text-foreground hover:bg-gold/90 font-display font-semibold text-base px-10 h-14 shadow-elevated">
              Get Early Access <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
