import { motion } from "framer-motion";
import { ToggleRight, MapPin, ShieldCheck, MessageSquare, Ban } from "lucide-react";

const features = [
  {
    icon: ToggleRight,
    title: "Real-Time Availability Toggle",
    description: "Landlords flip a switch when a unit is taken. You only see what's actually available—right now.",
    color: "bg-success/10 text-success",
  },
  {
    icon: MapPin,
    title: "Proximity & Transit Filter",
    description: "Search by walking distance from your campus. Because for CDO students, location isn't a luxury—it's survival.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ShieldCheck,
    title: "Verified Reviews & KYC",
    description: "Every landlord goes through identity verification. Tenant reviews you can actually trust.",
    color: "bg-gold/20 text-foreground",
  },
  {
    icon: MessageSquare,
    title: "In-App Inquiry Tracker",
    description: "Track every message, viewing schedule, and application status in one place. No more lost threads.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Ban,
    title: "Spam & Duplicate Detection",
    description: "AI-powered filtering removes fake, duplicate, and expired listings before you ever see them.",
    color: "bg-warning/10 text-warning",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mt-3 text-foreground">
            Built for <span className="text-gradient-brand">What You Need</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto font-body">
            Every feature maps directly to the problems students told us about. No fluff.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-xl text-card-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
