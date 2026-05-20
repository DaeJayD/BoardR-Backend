import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { MapPin, Star, ShieldCheck, ArrowLeft, MessageSquare, Calendar, Phone, Wifi, Bath, UtensilsCrossed, Lock, Wind, CheckCircle, User } from "lucide-react";
import { mockListings } from "@/lib/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi, "CR Inside": Bath, "Private CR": Bath, "Shared CR": Bath,
  Kitchen: UtensilsCrossed, "Shared Kitchen": UtensilsCrossed, "Personal Locker": Lock, "Air-con": Wind,
};

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openInquiry, setOpenInquiry] = useState(false);
  const [openVisit, setOpenVisit] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Listing not found</h2>
          <Link to="/listings"><Button variant="outline" className="font-display">Back to Listings</Button></Link>
        </div>
      </div>
    );
  }

  return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Link to="/listings" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-body text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to listings
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-8">
              {/* Image */}
              <div className="rounded-2xl overflow-hidden h-72 md:h-[420px] relative">
                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {listing.available ? (
                    <Badge className="bg-success text-primary-foreground font-display shadow-sm">Available</Badge>
                  ) : (
                    <Badge className="bg-destructive text-destructive-foreground font-display shadow-sm">Occupied</Badge>
                  )}
                  {listing.verified && (
                    <Badge className="bg-gold text-foreground font-display gap-1 shadow-sm"><ShieldCheck className="w-3 h-3" /> Verified</Badge>
                  )}
                </div>
              </div>

              {/* Info */}
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">{listing.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground font-body">
                  <MapPin className="w-4 h-4" /> {listing.address}
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-4 mb-6">
                  <span className="bg-muted px-3 py-1.5 rounded-lg text-sm font-body">{listing.distance} from {listing.school}</span>
                  <span className="bg-muted px-3 py-1.5 rounded-lg text-sm font-body">{listing.roomType}</span>
                  <div className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="font-display font-semibold text-sm">{listing.rating}</span>
                    <span className="text-muted-foreground text-sm">({listing.reviews})</span>
                  </div>
                </div>

                <p className="text-foreground font-body leading-relaxed">{listing.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {listing.amenities.map((a) => {
                    const Icon = amenityIcons[a] || CheckCircle;
                    return (
                      <div key={a} className="flex items-center gap-3 text-sm font-body text-foreground bg-muted/60 rounded-xl px-4 py-3">
                        <Icon className="w-4 h-4 text-primary shrink-0" /> {a}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rules */}
              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-4">House Rules</h3>
                <ul className="space-y-2.5">
                  {listing.rules.map((r) => (
                    <li key={r} className="text-sm font-body text-muted-foreground flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-warning rounded-full shrink-0" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
              <Card className="border-border/60 shadow-elevated sticky top-28">
                <CardContent className="p-6">
                  <div className="text-center mb-6 pb-6 border-b border-border">
                    <span className="text-4xl font-display font-bold text-primary">₱{listing.price.toLocaleString()}</span>
                    <span className="text-muted-foreground font-body">/month</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button
                      className="w-full bg-gold text-foreground hover:bg-gold/90 font-display font-semibold gap-2 h-12 text-base"
                      onClick={() => setOpenInquiry(true)}
                    >
                      <MessageSquare className="w-4 h-4" /> Send Inquiry
                    </Button>
                    <p className="text-xs text-muted-foreground font-body text-center -mt-1">Ask the landlord a question in chat</p>

                    <Button
                      variant="outline"
                      className="w-full font-display font-semibold gap-2 h-12 text-base"
                      onClick={() => setOpenVisit(true)}
                    >
                      <Calendar className="w-4 h-4" /> Schedule Visit
                    </Button>
                    <p className="text-xs text-muted-foreground font-body text-center -mt-1">Pick a day to see the place in person</p>
                  </div>

                  {/* Landlord */}
                  <div className="border-t border-border pt-5">
                    <h4 className="font-display font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">Landlord</h4>
                    <button
                      onClick={() => navigate("/landlord-dashboard")}
                      className="w-full flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-muted/60 transition-colors text-left"
                    >
                      <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                        {listing.landlord.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-display font-semibold text-foreground text-sm">{listing.landlord.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <Star className="w-3 h-3 fill-gold text-gold" /> {listing.landlord.rating}
                          {listing.landlord.verified && (
                            <Badge className="bg-gold/15 text-foreground text-[10px] px-1.5 border-0">Verified</Badge>
                          )}
                        </div>
                      </div>
                      <User className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3 text-primary font-body gap-2 h-10"
                      onClick={() => setOpenContact(true)}
                    >
                      <Phone className="w-3.5 h-3.5" /> Contact Landlord
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Send Inquiry Dialog */}
        <Dialog open={openInquiry} onOpenChange={setOpenInquiry}>
          <DialogContent className="max-w-sm rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Send an inquiry?</DialogTitle>
              <DialogDescription className="font-body text-sm pt-2">
                We will start a chat with <b>{listing.landlord.name}</b> about <b>{listing.title}</b>.
                You can write your question on the next screen. The landlord usually replies within a day.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col gap-2 sm:flex-col">
              <Button
                className="w-full h-12 bg-primary text-primary-foreground font-display"
                onClick={() => { setOpenInquiry(false); toast.success("Chat opened with the landlord"); navigate("/inquiry"); }}
              >
                Yes, open chat
              </Button>
              <Button variant="outline" className="w-full h-11 font-display" onClick={() => setOpenInquiry(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Schedule Visit Dialog */}
        <Dialog open={openVisit} onOpenChange={setOpenVisit}>
          <DialogContent className="max-w-sm rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Schedule a visit?</DialogTitle>
              <DialogDescription className="font-body text-sm pt-2">
                We will ask <b>{listing.landlord.name}</b> for a day and time you can come see the place.
                You will get the address and a confirmation in your Inbox.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col gap-2 sm:flex-col">
              <Button
                className="w-full h-12 bg-primary text-primary-foreground font-display"
                onClick={() => { setOpenVisit(false); toast.success("Visit request sent"); navigate("/inquiry"); }}
              >
                Yes, request visit
              </Button>
              <Button variant="outline" className="w-full h-11 font-display" onClick={() => setOpenVisit(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Contact Landlord Dialog */}
        <Dialog open={openContact} onOpenChange={setOpenContact}>
          <DialogContent className="max-w-sm rounded-2xl">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Contact {listing.landlord.name}</DialogTitle>
              <DialogDescription className="font-body text-sm pt-2">
                Choose how you want to reach the landlord.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 mt-2">
              <Button
                className="w-full h-12 bg-primary text-primary-foreground font-display gap-2"
                onClick={() => { setOpenContact(false); navigate("/inquiry"); }}
              >
                <MessageSquare className="w-4 h-4" /> Send a message
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 font-display gap-2"
                onClick={() => { setOpenContact(false); toast.success("Calling landlord..."); window.location.href = "tel:+639000000000"; }}
              >
                <Phone className="w-4 h-4" /> Call on the phone
              </Button>
              <Button variant="ghost" className="w-full h-11 font-display" onClick={() => setOpenContact(false)}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
};

export default ListingDetails;
