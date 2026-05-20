import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/listings", label: "Listings" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const isHome = location.pathname === "/";
  const navBg = scrolled || !isHome
    ? "bg-foreground/95 backdrop-blur-xl shadow-elevated"
    : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-display font-bold text-2xl text-background flex items-center gap-1">
          BOARD<span className="text-gold">R</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-display font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-gold bg-gold/10"
                  : "text-background/70 hover:text-gold hover:bg-background/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-background/80 hover:text-gold hover:bg-background/10 font-display gap-2">
              <LogIn className="w-4 h-4" /> Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="bg-gold text-foreground hover:bg-gold/90 font-display font-semibold gap-2">
              <UserPlus className="w-4 h-4" /> Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-background p-2 rounded-lg hover:bg-background/10 transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-foreground/98 backdrop-blur-xl border-t border-background/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded-lg font-display text-sm transition-colors ${
                    location.pathname === link.to
                      ? "text-gold bg-gold/10"
                      : "text-background/70 hover:text-gold hover:bg-background/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-3 border-t border-background/10 mt-3">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full border-background/20 text-background font-display gap-2">
                    <LogIn className="w-4 h-4" /> Login
                  </Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button size="sm" className="w-full bg-gold text-foreground hover:bg-gold/90 font-display font-semibold gap-2">
                    <UserPlus className="w-4 h-4" /> Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
