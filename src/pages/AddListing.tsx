import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ImagePlus, CheckCircle } from "lucide-react";
import { schools, roomTypes } from "@/lib/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AddListing = () => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);

  const handleSubmit = () => {
    toast.success("Listing created successfully!");
    navigate("/landlord-dashboard");
  };

  return (
    <div className="min-h-screen bg-muted/20">
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <Link to="/landlord-dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-body text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to dashboard
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="shadow-elevated border-border/60">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Add New Listing</CardTitle>
                <CardDescription className="font-body">Fill in the details of your boarding house or rental property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-display text-sm">Boarding House Name *</Label>
                  <Input placeholder="e.g. Sunny Studio near USTP" className="font-body h-11" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-display text-sm">Price per Month (₱) *</Label>
                    <Input type="number" placeholder="3500" className="font-body h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-display text-sm">Room Type *</Label>
                    <Select>
                      <SelectTrigger className="h-11"><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        {roomTypes.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-display text-sm">Address *</Label>
                  <Input placeholder="Corrales Ave, Cagayan de Oro" className="font-body h-11" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-display text-sm">Nearest School</Label>
                    <Select>
                      <SelectTrigger className="h-11"><SelectValue placeholder="Select school" /></SelectTrigger>
                      <SelectContent>
                        {schools.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-display text-sm">Distance from School</Label>
                    <Input placeholder="e.g. 0.3 km" className="font-body h-11" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-display text-sm">Description *</Label>
                  <Textarea placeholder="Describe your property, amenities, and what makes it great for students..." className="font-body min-h-[120px]" />
                </div>

                <div className="space-y-2">
                  <Label className="font-display text-sm">Photos</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group">
                    <ImagePlus className="w-10 h-10 mx-auto text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
                    <p className="text-sm text-muted-foreground font-body">Click to upload photos</p>
                    <p className="text-xs text-muted-foreground font-body mt-1">JPG, PNG up to 5MB each</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-display text-sm">House Rules</Label>
                  <Textarea placeholder="e.g. No pets, Curfew 10PM, No smoking..." className="font-body" />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/60 rounded-xl">
                  <div>
                    <Label className="font-display text-sm">Availability</Label>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">Toggle when unit is available or occupied</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-display font-semibold ${available ? "text-success" : "text-destructive"}`}>
                      {available ? "Available" : "Occupied"}
                    </span>
                    <Switch checked={available} onCheckedChange={setAvailable} />
                  </div>
                </div>

                <Button
                  className="w-full bg-gold text-foreground hover:bg-gold/90 font-display font-semibold h-12 gap-2"
                  onClick={handleSubmit}
                >
                  <CheckCircle className="w-4 h-4" /> Publish Listing
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
