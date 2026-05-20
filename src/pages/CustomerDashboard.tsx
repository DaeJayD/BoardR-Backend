import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  Search,
  Star,
} from "lucide-react";
import { mockListings, mockInquiries } from "@/lib/mockData";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const savedListings = mockListings.slice(0, 3);

const CustomerDashboard = () => {
  const { profile, signOut, authLoading } = useAuth();
  const navigate = useNavigate();

  // 🔥 SAFE LOADING STATE
  if (authLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between mb-8 gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-lg">
                {profile.full_name?.[0] ?? "U"}
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  Welcome back, {profile.full_name ?? "User"} 👋
                </h1>

                <p className="text-muted-foreground text-sm">
                  {profile.school ?? "No School"} • Student Account
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to="/listings">
                <Button variant="outline" className="gap-2">
                  <Search className="w-4 h-4" /> Browse
                </Button>
              </Link>

              <Link to="/inquiry">
                <Button className="gap-2">
                  <MessageSquare className="w-4 h-4" /> Messages
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Heart, value: "3", label: "Saved Listings" },
              { icon: MessageSquare, value: "3", label: "Active Inquiries" },
              { icon: Star, value: "2", label: "Reviews Given" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-5 flex items-center gap-4">
                  <stat.icon className="w-5 h-5" />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="saved">
            <TabsList className="mb-6">
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* SAVED */}
            <TabsContent value="saved">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedListings.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            </TabsContent>

            {/* INQUIRIES */}
            <TabsContent value="inquiries">
              <div className="space-y-3">
                {mockInquiries.map((inq) => (
                  <Card key={inq.id}>
                    <CardContent className="p-5 flex justify-between">
                      <div>
                        <h3>{inq.listingTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                          {inq.lastMessage}
                        </p>
                        <Badge>{inq.status}</Badge>
                      </div>

                      <Link to="/inquiry">
                        <Button variant="ghost">Open</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* PROFILE */}
            <TabsContent value="profile">
              <Card className="max-w-lg">
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="font-bold">{profile.full_name ?? "User"}</p>
                    <p className="text-sm">{profile.email ?? "No email"}</p>
                    <p className="text-xs">
                      {profile.school ?? "No School"} • {profile.role ?? "student"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Settings className="w-4 h-4" /> Edit
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={async () => {
                        await signOut();
                        navigate("/login", { replace: true });
                      }}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
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

export default CustomerDashboard;