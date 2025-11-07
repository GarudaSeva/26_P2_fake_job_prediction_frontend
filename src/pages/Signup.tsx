import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/signup", {
        name,
        email,
        password,
        confirmPassword,
      });

      if (response.data.message) {
        toast({
          title: "Account Created",
          description: "Welcome to FakeInternGuard!",
        });
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Signup error:", error);

      // Extract backend error message if available
      const errMsg =
        error.response?.data?.error || "Something went wrong during signup.";

      toast({
        title: "Signup Failed",
        description: errMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-secondary/30 via-background to-secondary/20 p-4">
      <Card className="w-full max-w-md border-2 border-green-400 shadow-xl animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-700">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>

            <div className="text-center text-sm mt-2">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-green-700 hover:underline font-medium">
                Sign in
              </Link>
            </div>

            <div className="text-center mt-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-green-700">
                ← Back to Home
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
