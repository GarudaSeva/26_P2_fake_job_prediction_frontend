import { Link, useNavigate } from "react-router-dom";
import { Shield, Zap, Lock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-illustration.jpg";

const Index = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    const user = sessionStorage.getItem("user");
    const navigate = useNavigate();

    if (user) {
      navigate("/detect");
    } else {
      sessionStorage.setItem("redirectAfterLogin", "/detect");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
          <div className="container py-20 md:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in">
                <div className="inline-block">
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                    AI-Powered Protection
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Detect Fake Internships{" "}
                  <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                    Instantly
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  Stay Safe from Scams. Our advanced machine learning algorithms analyze job postings in real-time to protect students from fraudulent opportunities.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/detect">
                    <Button size="lg" className="w-full sm:w-auto text-lg px-8" onClick={handleClick}>
                      Try Now
                      <Zap className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={scrollToAbout}
                    className="w-full sm:w-auto text-lg px-8"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="relative animate-slide-up">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={heroImage} 
                    alt="AI-powered internship protection" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Why Choose FakeInternGuard?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Powerful features designed to keep you safe from internship scams
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover-lift border-2">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">AI-Powered Detection</h3>
                  <p className="text-muted-foreground">
                    Advanced machine learning algorithms analyze patterns to identify fake postings with high accuracy
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift border-2">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Instant Results</h3>
                  <p className="text-muted-foreground">
                    Get real-time analysis in seconds with detailed probability scores and visual insights
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift border-2">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Privacy First</h3>
                  <p className="text-muted-foreground">
                    Your data is secure and private. We don't store or share your job posting information
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-secondary/20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2">
                <CardContent className="p-8 md:p-12 space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold">About FakeInternGuard</h2>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    FakeInternGuard is an innovative platform designed to combat the rising threat of fraudulent internship postings. Using state-of-the-art machine learning algorithms, we analyze job descriptions to identify suspicious patterns and warning signs that indicate potential scams.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our mission is to protect students and early-career professionals from falling victim to fake opportunities that waste time, compromise personal information, or worse. With FakeInternGuard, you can verify the authenticity of any internship posting in seconds.
                  </p>
                  
                  <div className="pt-6">
                    <Link to="/detect">
                      <Button size="lg" className="w-full sm:w-auto" onClick={handleClick}>
                        Start Detecting Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
