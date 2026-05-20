import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/AppShell";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Listings from "./pages/Listings.tsx";
import ListingDetails from "./pages/ListingDetails.tsx";
import Inquiry from "./pages/Inquiry.tsx";
import CustomerDashboard from "./pages/CustomerDashboard.tsx";
import LandlordDashboard from "./pages/LandlordDashboard.tsx";
import AddListing from "./pages/AddListing.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import { AuthProvider } from "@/context/AuthContext";
import { PrivateRoute } from "@/components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppShell>
            <Routes>
              {/* ================= PUBLIC ================= */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/listing/:id" element={<ListingDetails />} />
              <Route path="/contact" element={<Contact />} />

              {/* ================= STUDENT ================= */}
              <Route
                path="/customer-dashboard"
                element={
                  <PrivateRoute role="student">
                    <CustomerDashboard />
                  </PrivateRoute>
                }
              />

              {/* ================= LANDLORD ================= */}
              <Route
                path="/landlord-dashboard"
                element={
                  <PrivateRoute role="landlord">
                    <LandlordDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/add-listing"
                element={
                  <PrivateRoute role="landlord">
                    <AddListing />
                  </PrivateRoute>
                }
              />

              {/* ================= ADMIN ================= */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute role="admin">
                    <AdminPanel />
                  </PrivateRoute>
                }
              />

              {/* ================= PROTECTED (ANY USER) ================= */}
              <Route
                path="/inquiry"
                element={
                  <PrivateRoute>
                    <Inquiry />
                  </PrivateRoute>
                }
              />

              {/* ================= FALLBACK ================= */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;