import { motion } from "framer-motion";
import { AlertTriangle, Clock, Eye, XCircle } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Outdated Listings",
    description: "Units are already occupied by the time you inquire. You waste hours chasing ghosts.",
  },
  {
    icon: XCircle,
    title: "Inconsistent Info",
    description: "Prices, amenities, and availability differ across every platform. Comparing is a nightmare.",
  },
  {
    icon: AlertTriangle,
    title: "Scams & Fake Accounts",
    description: "No way to verify landlords. Students fall victim to misleading listings and bots.",
  },
  {
    icon: Eye,
    title: "No Transparency",
    description: "Hidden fees, unresponsive landlords, and no reviews leave students in the dark.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-warning font-display font-semibold text-sm uppercase tracking-wider">The Problem</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mt-3 text-foreground">
            The Rental Search is <span className="text-warning">Broken</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto font-body">
            CDO students spend weeks searching for a rental—only to find outdated listings, scams, and dead ends.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-display font-semibold text-lg text-card-foreground mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
