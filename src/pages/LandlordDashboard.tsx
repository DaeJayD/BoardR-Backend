import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Home, MessageSquare, Plus, User, Settings, LogOut, Eye, Star, ChevronRight } from "lucide-react";
import { mockListings, mockInquiries } from "@/lib/mockData";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";

const myListings = mockListings.slice(0, 3);

const LandlordDashboard = () => {
  const [availability, setAvailability] = useState<Record<string, boolean>>(
    Object.fromEntries(myListings.map((l) => [l.id, l.available]))
  );

  const toggleAvailability = (id: string) => {
    setAvailability((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      toast.success(`Listing marked as ${next[id] ? "available" : "occupied"}`);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold flex items-center justify-center text-foreground font-display font-bold text-lg">MS</div>
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">Welcome back, Maria! 👋</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-muted-foreground font-body text-sm">Landlord Account</p>
                  <Badge className="bg-gold/15 text-foreground font-display text-[10px] border border-gold/30">Verified</Badge>
                </div>
              </div>
            </div>
            <Link to="/add-listing">
              <Button className="bg-gold text-foreground hover:bg-gold/90 font-display gap-2 h-10">
                <Plus className="w-4 h-4" /> Add Listing
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Home, value: "3", label: "My Listings", color: "bg-primary/10", iconColor: "text-primary" },
              { icon: MessageSquare, value: "5", label: "Inquiries", color: "bg-gold/15", iconColor: "text-gold" },
              { icon: Eye, value: "142", label: "Views", color: "bg-success/10", iconColor: "text-success" },
              { icon: Star, value: "4.8", label: "Rating", color: "bg-primary/10", iconColor: "text-primary" },
            ].map((stat) => (
              <Card key={stat.label} className="border-border/60">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center shrink-0`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground font-body">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="mb-6 h-12">
              <TabsTrigger value="listings" className="font-display gap-2 h-10"><Home className="w-4 h-4" /> Listings</TabsTrigger>
              <TabsTrigger value="inquiries" className="font-display gap-2 h-10"><MessageSquare className="w-4 h-4" /> Inquiries</TabsTrigger>
              <TabsTrigger value="profile" className="font-display gap-2 h-10"><User className="w-4 h-4" /> Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="listings">
              <div className="space-y-3">
                {myListings.map((listing) => (
                  <Card key={listing.id} className="border-border/60 hover:shadow-card transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img src={listing.images[0]} alt={listing.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-semibold text-foreground">{listing.title}</h3>
                          <p className="text-sm text-muted-foreground font-body truncate">{listing.address} · ₱{listing.price.toLocaleString()}/mo</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                            <span className="text-sm font-display">{listing.rating}</span>
                            <span className="text-xs text-muted-foreground">({listing.reviews})</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 shrink-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-display font-semibold px-2 py-1 rounded-md ${
                              availability[listing.id] ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                            }`}>
                              {availability[listing.id] ? "Available" : "Occupied"}
                            </span>
                            <Switch
                              checked={availability[listing.id]}
                              onCheckedChange={() => toggleAvailability(listing.id)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/listing/${listing.id}`}>
                              <Button variant="outline" size="sm" className="font-display text-xs h-8">View</Button>
                            </Link>
                            <Button variant="outline" size="sm" className="font-display text-xs h-8">Edit</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inquiries">
              <div className="space-y-3">
                {mockInquiries.map((inq) => (
                  <Card key={inq.id} className="border-border/60 hover:shadow-card transition-shadow">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display font-semibold text-foreground">{inq.studentName}</h3>
                        <p className="text-sm text-muted-foreground font-body">Re: {inq.listingTitle}</p>
                        <p className="text-sm text-muted-foreground font-body mt-1 truncate">{inq.lastMessage}</p>
                        <span className="text-xs text-muted-foreground">{inq.timestamp}</span>
                      </div>
                      <Link to="/inquiry">
                        <Button size="sm" className="bg-primary text-primary-foreground font-display gap-1 shrink-0 ml-4">
                          <MessageSquare className="w-4 h-4" /> Reply
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <Card className="border-border/60 max-w-lg">
                <CardHeader><CardTitle className="font-display">Landlord Profile</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center text-foreground font-display font-bold text-xl">MS</div>
                    <div>
                      <p className="font-display font-bold text-foreground">Maria Santos</p>
                      <p className="text-sm text-muted-foreground font-body">maria@email.com</p>
                      <Badge className="bg-gold/15 text-foreground font-display text-xs mt-1 border border-gold/30">Verified Landlord</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="font-display gap-2"><Settings className="w-4 h-4" /> Edit Profile</Button>
                    <Link to="/login">
                      <Button variant="ghost" className="text-destructive font-display gap-2"><LogOut className="w-4 h-4" /> Logout</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
