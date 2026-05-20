import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Users, Home, AlertTriangle, Ban, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const pendingLandlords = [
  { id: "l1", name: "Pedro Gomez", email: "pedro@email.com", submitted: "Mar 5, 2026", docs: "Valid ID uploaded" },
  { id: "l2", name: "Lisa Mangubat", email: "lisa@email.com", submitted: "Mar 7, 2026", docs: "Valid ID uploaded" },
];

const reportedListings = [
  { id: "r1", listing: "Cheap Room Macabalan", reason: "Suspected scam – no photos, suspicious pricing", reporter: "Anna Cruz", date: "Mar 8, 2026" },
  { id: "r2", listing: "Bedspace Kauswagan", reason: "Duplicate listing – same photos as another property", reporter: "Mark Gonzales", date: "Mar 7, 2026" },
];

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-muted/20">
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground font-body text-sm">Manage users, listings, and platform safety</p>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, value: "48", label: "Total Users", color: "bg-primary/10", iconColor: "text-primary" },
              { icon: Home, value: "24", label: "Active Listings", color: "bg-gold/15", iconColor: "text-gold" },
              { icon: AlertTriangle, value: "2", label: "Reports", color: "bg-warning/10", iconColor: "text-warning" },
              { icon: ShieldCheck, value: "2", label: "Pending KYC", color: "bg-success/10", iconColor: "text-success" },
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

          <Tabs defaultValue="verification" className="w-full">
            <TabsList className="mb-6 h-12">
              <TabsTrigger value="verification" className="font-display gap-2 h-10"><ShieldCheck className="w-4 h-4" /> Verification</TabsTrigger>
              <TabsTrigger value="reports" className="font-display gap-2 h-10"><AlertTriangle className="w-4 h-4" /> Reports</TabsTrigger>
              <TabsTrigger value="users" className="font-display gap-2 h-10"><Users className="w-4 h-4" /> Users</TabsTrigger>
            </TabsList>

            <TabsContent value="verification">
              <h3 className="font-display font-bold text-foreground mb-4">Pending Landlord Verification</h3>
              <div className="space-y-3">
                {pendingLandlords.map((l) => (
                  <Card key={l.id} className="border-border/60 hover:shadow-card transition-shadow">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div>
                        <h4 className="font-display font-semibold text-foreground">{l.name}</h4>
                        <p className="text-sm text-muted-foreground font-body">{l.email}</p>
                        <p className="text-xs text-muted-foreground font-body mt-1">{l.submitted} · {l.docs}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-success text-primary-foreground font-display gap-1 h-9" onClick={() => toast.success(`${l.name} approved!`)}>
                          <CheckCircle className="w-4 h-4" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive border-destructive/30 font-display gap-1 h-9" onClick={() => toast.error(`${l.name} rejected`)}>
                          <XCircle className="w-4 h-4" /> Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <h3 className="font-display font-bold text-foreground mb-4">Reported Listings</h3>
              <div className="space-y-3">
                {reportedListings.map((r) => (
                  <Card key={r.id} className="border-border/60 border-l-4 border-l-warning hover:shadow-card transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-display font-semibold text-foreground">{r.listing}</h4>
                          <p className="text-sm text-muted-foreground font-body mt-1">{r.reason}</p>
                          <p className="text-xs text-muted-foreground font-body mt-2">Reported by {r.reporter} · {r.date}</p>
                        </div>
                        <div className="flex gap-2 shrink-0 ml-4">
                          <Button size="sm" variant="outline" className="text-destructive border-destructive/30 font-display gap-1 h-9" onClick={() => toast.success("Listing removed")}>
                            <Ban className="w-4 h-4" /> Remove
                          </Button>
                          <Button size="sm" variant="outline" className="font-display h-9" onClick={() => toast.info("Report dismissed")}>
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">User management coming soon</h3>
                <p className="text-muted-foreground font-body text-sm">Full user management will be available when connected to a database.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
