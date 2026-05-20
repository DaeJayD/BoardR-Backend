import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Home, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, actionLoading, error, user, profile } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    student: { email: "", password: "" },
    landlord: { email: "", password: "" },
  });

  const handleChange = (role: "student" | "landlord", field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: value,
      },
    }));
  };


  const handleLogin = async (role: "student" | "landlord") => {
    const { email, password } = form[role];

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await signIn(email, password);
      toast.success("Login successful");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <Link to="/">
            <span className="font-bold text-2xl">
              BOARD<span className="text-gold">R</span>
            </span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="student">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="student">
                  <GraduationCap className="w-4 h-4" /> Student
                </TabsTrigger>
                <TabsTrigger value="landlord">
                  <Home className="w-4 h-4" /> Landlord
                </TabsTrigger>
              </TabsList>

              {/* STUDENT */}
              <TabsContent value="student" className="space-y-4">
                <Input
                  name="student-email"
                  autoComplete="email"
                  placeholder="Email"
                  value={form.student.email}
                  onChange={(e) => handleChange("student", "email", e.target.value)}
                />

                <Input
                  name="student-password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.student.password}
                  onChange={(e) => handleChange("student", "password", e.target.value)}
                />

                <Button disabled={actionLoading} onClick={() => handleLogin("student")}>
                  {actionLoading ? "Signing in..." : "Sign in as Student"}
                </Button>
              </TabsContent>

              {/* LANDLORD */}
              <TabsContent value="landlord" className="space-y-4">
                <Input
                  name="landlord-email"
                  autoComplete="email"
                  placeholder="Email"
                  value={form.landlord.email}
                  onChange={(e) => handleChange("landlord", "email", e.target.value)}
                />

                <Input
                  name="landlord-password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.landlord.password}
                  onChange={(e) => handleChange("landlord", "password", e.target.value)}
                />

                <Button disabled={actionLoading} onClick={() => handleLogin("landlord")}>
                  {actionLoading ? "Signing in..." : "Sign in as Landlord"}
                </Button>
              </TabsContent>
            </Tabs>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;