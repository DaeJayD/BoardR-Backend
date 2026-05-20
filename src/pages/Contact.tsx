import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, AlertTriangle, HelpCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Contact = () => {
  return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Contact & Support</h1>
            <p className="text-muted-foreground font-body max-w-md mx-auto">Need help? Report a listing? We're here for you.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
            {[
              { icon: Mail, title: "Email Us", desc: "support@boardr.ph", color: "text-primary", bg: "bg-primary/10" },
              { icon: HelpCircle, title: "Help Center", desc: "FAQs & guides", color: "text-gold", bg: "bg-gold/15" },
              { icon: AlertTriangle, title: "Report Scam", desc: "Help keep BOARDR safe", color: "text-warning", bg: "bg-warning/10" },
            ].map((item) => (
              <Card key={item.title} className="border-border/60 text-center hover:shadow-card transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-xl mx-auto shadow-elevated border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-xl">Send a Message</CardTitle>
              <CardDescription className="font-body">We'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-display text-sm">Name</Label>
                  <Input placeholder="Your name" className="font-body h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-display text-sm">Email</Label>
                  <Input type="email" placeholder="your@email.com" className="font-body h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-display text-sm">Category</Label>
                <Select>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="report">Report a Listing</SelectItem>
                    <SelectItem value="scam">Report a Scam</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-display text-sm">Message</Label>
                <Textarea placeholder="Tell us what's going on..." className="font-body min-h-[120px]" />
              </div>
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold gap-2 h-11"
                onClick={() => toast.success("Message sent! We'll get back to you soon.")}
              >
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default Contact;
