import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, ArrowLeft, Search } from "lucide-react";
import { mockInquiries } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  pending: "bg-gold/15 text-foreground border border-gold/30",
  replied: "bg-success/15 text-success border border-success/30",
  viewed: "bg-muted text-muted-foreground border border-border",
  closed: "bg-destructive/15 text-destructive border border-destructive/30",
};

const mockMessages = [
  { id: 1, from: "student", text: "Hi! Is the room still available? I'd like to schedule a visit.", time: "2:30 PM" },
  { id: 2, from: "landlord", text: "Yes, it's still available! When would you like to come?", time: "2:45 PM" },
  { id: 3, from: "student", text: "Is Saturday morning okay? Around 10 AM?", time: "3:00 PM" },
  { id: 4, from: "landlord", text: "Perfect! I'll see you on Saturday at 10 AM. Please bring a valid ID.", time: "3:15 PM" },
];

const Inquiry = () => {
  const [selected, setSelected] = useState(mockInquiries[0]?.id || "");
  const [message, setMessage] = useState("");
  const selectedInquiry = mockInquiries.find((i) => i.id === selected);

  return (
      <div className="pt-20 h-screen flex flex-col">
        <div className="container mx-auto px-6 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-4 py-4">
            <Link to="/customer-dashboard" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">Messages</h1>
              <p className="text-xs text-muted-foreground font-body">{mockInquiries.length} conversations</p>
            </div>
          </div>

          <div className="flex-1 flex gap-0 overflow-hidden rounded-xl border border-border/60 bg-card mb-6 shadow-card">
            {/* Sidebar */}
            <div className="w-80 border-r border-border overflow-y-auto hidden md:flex flex-col bg-muted/20">
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input placeholder="Search messages..." className="pl-9 h-9 text-sm border-0 bg-muted/60 font-body" />
                </div>
              </div>
              {mockInquiries.map((inq) => (
                <button
                  key={inq.id}
                  onClick={() => setSelected(inq.id)}
                  className={`w-full text-left p-4 border-b border-border/50 hover:bg-muted/50 transition-colors ${
                    selected === inq.id ? "bg-muted border-l-2 border-l-primary" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-semibold text-sm text-card-foreground truncate">{inq.listingTitle}</span>
                    {inq.unread > 0 && (
                      <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-display font-bold">
                        {inq.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-body truncate mt-0.5">{inq.lastMessage}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge className={`${statusColors[inq.status]} text-[10px] font-display`}>{inq.status}</Badge>
                    <span className="text-[10px] text-muted-foreground">{inq.timestamp}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Chat */}
            <div className="flex-1 flex flex-col">
              {selectedInquiry ? (
                <>
                  <div className="p-4 border-b border-border bg-background/50">
                    <h3 className="font-display font-bold text-card-foreground">{selectedInquiry.listingTitle}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground font-body">with {selectedInquiry.landlordName}</span>
                      <Badge className={`${statusColors[selectedInquiry.status]} text-[10px]`}>{selectedInquiry.status}</Badge>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {mockMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.from === "student" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          msg.from === "student"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        }`}>
                          <p className="text-sm font-body leading-relaxed">{msg.text}</p>
                          <span className={`text-[10px] mt-1.5 block ${
                            msg.from === "student" ? "text-primary-foreground/50" : "text-muted-foreground"
                          }`}>{msg.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-border bg-background/50">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="font-body h-11"
                      />
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 w-11 shrink-0" size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground font-body">
                  <div className="text-center">
                    <MessageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Select a conversation to start</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

const MessageIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default Inquiry;
