import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Home, Upload, ArrowLeft } from "lucide-react";
import { schools } from "@/lib/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    school: "",
    phone: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (role: "student" | "landlord") => {
    // basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (role === "student" && !formData.school) {
      toast.error("Please select your school");
      return;
    }

    if (role === "landlord" && !formData.phone) {
      toast.error("Please enter your phone number");
      return;
    }

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role,
        school: formData.school,
        phone: formData.phone,
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message || "Sign up failed");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-body transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <Link to="/">
            <span className="font-display font-bold text-2xl text-foreground">
              BOARD<span className="text-gold">R</span>
            </span>
          </Link>
        </div>

        <Card className="shadow-elevated border-border/60">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-display text-2xl">Create Account</CardTitle>
            <CardDescription className="font-body">Join BOARDR — it's free</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
                <TabsTrigger value="student" className="font-display text-sm gap-2 h-10">
                  <GraduationCap className="w-4 h-4" /> Student
                </TabsTrigger>
                <TabsTrigger value="landlord" className="font-display text-sm gap-2 h-10">
                  <Home className="w-4 h-4" /> Landlord
                </TabsTrigger>
              </TabsList>

              {/* STUDENT */}
              <TabsContent value="student" className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>School *</Label>
                  <Select onValueChange={(v) => updateField("school", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your school" />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Password *</Label>
                  <Input type="password" value={formData.password} onChange={(e) => updateField("password", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Confirm Password *</Label>
                  <Input type="password" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} />
                </div>

                <Button
                  disabled={loading}
                  onClick={() => handleSignUp("student")}
                  className="w-full"
                >
                  {loading ? "Creating..." : "Create Student Account"}
                </Button>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </TabsContent>

              {/* LANDLORD */}
              <TabsContent value="landlord" className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input value={formData.name} onChange={(e) => updateField("name", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input value={formData.email} onChange={(e) => updateField("email", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} />
                </div>

                <div className="space-y-2 border-2 border-dashed p-4 text-center">
                  <Upload className="mx-auto mb-2" />
                  <p className="text-sm">Upload ID (UI only)</p>
                </div>

                <div className="space-y-2">
                  <Label>Password *</Label>
                  <Input type="password" value={formData.password} onChange={(e) => updateField("password", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Confirm Password *</Label>
                  <Input type="password" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} />
                </div>

                <Button
                  disabled={loading}
                  onClick={() => handleSignUp("landlord")}
                  className="w-full"
                >
                  {loading ? "Creating..." : "Create Landlord Account"}
                </Button>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </TabsContent>
            </Tabs>

            <p className="text-center text-sm mt-6">
              Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;