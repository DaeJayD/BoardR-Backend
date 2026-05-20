import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

const noNavPages = ["/login", "/signup"];
const noFooterPages = ["/login", "/signup", "/inquiry", "/customer-dashboard", "/landlord-dashboard", "/admin", "/add-listing"];

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const hideNav = noNavPages.includes(pathname);
  const hideFooter = noFooterPages.includes(pathname);

  return (
    <div className="min-h-screen bg-background">
      {!hideNav && <Navbar />}
      <main className="pb-20 md:pb-0">{children}</main>
      {!hideFooter && <Footer />}
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default AppShell;
