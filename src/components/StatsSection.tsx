import { motion } from "framer-motion";

const stats = [
  { value: "100%", label: "want walking-distance listings" },
  { value: "100%", label: "demand landlord verification" },
  { value: "3km+", label: "walked by some just to find a place" },
  { value: "#1", label: "concern: outdated listings" },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-2">{stat.value}</div>
              <div className="text-primary-foreground/70 font-body text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
