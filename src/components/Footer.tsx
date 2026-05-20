import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 bg-foreground">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <Link to="/" className="font-display font-bold text-2xl text-background inline-block mb-3">
              BOARD<span className="text-gold">R</span>
            </Link>
            <p className="text-background/40 font-body text-sm leading-relaxed">
              Hyper-local rental platform for students in Cagayan de Oro City. Find verified boarding houses near your campus.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-background text-sm mb-4 uppercase tracking-wider">Platform</h4>
            <div className="space-y-2.5">
              <Link to="/listings" className="block text-background/40 text-sm font-body hover:text-gold transition-colors">Browse Listings</Link>
              <Link to="/signup" className="block text-background/40 text-sm font-body hover:text-gold transition-colors">Sign Up</Link>
              <Link to="/login" className="block text-background/40 text-sm font-body hover:text-gold transition-colors">Login</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-background text-sm mb-4 uppercase tracking-wider">For Landlords</h4>
            <div className="space-y-2.5">
              <Link to="/add-listing" className="block text-background/40 text-sm font-body hover:text-gold transition-colors">Add Listing</Link>
              <Link to="/landlord-dashboard" className="block text-background/40 text-sm font-body hover:text-gold transition-colors">Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-background text-sm mb-4 uppercase tracking-wider">Support</h4>
            <div className="space-y-2.5">
              <Link to="/contact" className="block text-background/40 text-sm font-body hover:text-gold transition-colors">Contact Us</Link>
              <a href="#" className="block text-background/40 text-sm font-body hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="block text-background/40 text-sm font-body hover:text-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-background/30 font-body text-sm">© 2026 BOARDR. All rights reserved.</p>
          <p className="text-background/20 font-body text-xs">Made for CDO students 🎓</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
