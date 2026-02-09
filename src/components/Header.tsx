import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const isActive = (path: string) => location.pathname === path;

  // ✅ Load session user + listen for login/logout across tabs
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleStorageChange = (event: StorageEvent) => {
      // Cross-tab login sync
      if (event.key === "session_sync" && event.newValue) {
        const data = JSON.parse(event.newValue);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }

      // Cross-tab logout sync
      if (event.key === "logout_all_tabs") {
        sessionStorage.removeItem("user");
        setUser(null);
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    localStorage.setItem("logout_all_tabs", Date.now().toString());
    navigate("/login");
  };

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Shield className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            FakeInternGuard
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {/* <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-foreground/60"
            }`}
          >
            Home
          </Link> */}

          {/* Show only when logged in */}
          {user && (
            <Link
              to="/detect"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/detect") ? "text-primary" : "text-foreground/60"
              }`}
            >
              Detection
            </Link>
          )}
        </nav>

        {/* Right Side: Auth Buttons or Profile */}
        {/* <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full text-green-700 font-semibold cursor-pointer hover:bg-green-200 transition-colors">
                  {getInitial(user.name)}
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="mt-2">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-100 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div> */}
      </div>
    </header>
  );
};

export default Header;
