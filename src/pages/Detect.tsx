import { useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingDots from "@/components/LoadingDots";
import ResultDisplay from "@/components/ResultDisplay";

interface PredictionResult {
  label: string;
  fake_probability: number;
  real_probability: number;
}

interface BackendResponse {
  label: string;
  proba: {
    fake: number;
    real: number;
  };
}

const Detect = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description to analyze",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post<BackendResponse>(
        "http://127.0.0.1:5000/predict",
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      const data = response.data;
      setResult({
        label: data.label || "Unknown",
        fake_probability: data?.proba?.fake ?? 0,
        real_probability: data?.proba?.real ?? 0,
      });

      toast({
        title: "Analysis Complete",
        description: "The job posting has been analyzed successfully",
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        title: "Error",
        description: "Failed to analyze the job posting. Please ensure the API server is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exampleText =
    "Work from home, earn $3000 weekly without experience. Send your details now! No interview required. Immediate start available. Just pay a small registration fee to begin.";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-12 md:py-10">
        <div className="container max-w-4xl">
          <div className="text-center mb-12 space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-green-700">
              Detect Fake Internships
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Paste any internship or job description below and our AI will analyze it for authenticity
            </p>
          </div>

          <Card className="shadow-lg animate-slide-up border-green-400">
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">Job Description Analyzer</CardTitle>
              <CardDescription>
                Enter the complete job or internship posting text for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={exampleText}
                    className="min-h-[200px] border-green-500 resize-none text-base placeholder:text-gray-400 placeholder:italic"
                    disabled={loading}
                  />
                  <p className="text-sm text-muted-foreground">
                    Tip: Include as much detail as possible for better accuracy
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoadingDots />
                      <span className="ml-3">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Check Authenticity
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {result && (
            <div className="mt-8">
              <ResultDisplay
                label={result.label}
                fakeProb={result.fake_probability}
                realProb={result.real_probability}
              />
            </div>
          )}

          {!result && (
            <Card className="mt-8 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3 text-lg text-green-700">
                  Red Flags to Watch For:
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Unrealistic salary promises for entry-level positions</li>
                  <li>• Requests for upfront payments or registration fees</li>
                  <li>• Vague job descriptions without specific responsibilities</li>
                  <li>• No company information or unverifiable contact details</li>
                  <li>• Pressure to act immediately without proper interview process</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Detect;
