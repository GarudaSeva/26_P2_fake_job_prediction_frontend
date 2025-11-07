import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Shield className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            FakeInternGuard
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-foreground/60"
            }`}
          >
            Home
          </Link>
          <Link
            to="/detect"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/detect") ? "text-primary" : "text-foreground/60"
            }`}
          >
            Detection
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
