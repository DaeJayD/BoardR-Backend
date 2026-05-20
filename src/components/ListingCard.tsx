import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Listing } from "@/lib/mockData";
import { motion } from "framer-motion";

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/listing/${listing.id}`}>
        <Card className="group overflow-hidden hover:shadow-elevated transition-all duration-300 border-border/60 cursor-pointer">
          <div className="relative h-52 overflow-hidden">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-1.5">
              {listing.available ? (
                <Badge className="bg-success text-primary-foreground font-display text-[11px] shadow-sm">Available</Badge>
              ) : (
                <Badge className="bg-destructive text-destructive-foreground font-display text-[11px] shadow-sm">Occupied</Badge>
              )}
              {listing.verified && (
                <Badge className="bg-gold text-foreground font-display text-[11px] gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </Badge>
              )}
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="bg-background/95 backdrop-blur-sm text-foreground font-display font-bold text-sm px-3 py-1.5 rounded-lg shadow-sm">
                ₱{listing.price.toLocaleString()}<span className="text-muted-foreground text-xs font-body font-normal">/mo</span>
              </span>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-display font-bold text-card-foreground leading-tight group-hover:text-primary transition-colors">
                {listing.title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm font-body mb-3">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{listing.address}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
                <span className="bg-muted px-2 py-1 rounded-md">{listing.distance}</span>
                <span className="bg-muted px-2 py-1 rounded-md">{listing.roomType}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <span className="font-display font-semibold text-sm text-card-foreground">{listing.rating}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
