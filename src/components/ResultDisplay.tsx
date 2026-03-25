import { AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ResultDisplayProps {
  label: string;
  probabilities: {
    fake: number;
    real: number;
  };
}

/**
 * Displays the result of the Fake Job Detection API
 * with confidence bars and contextual message.
 */
const ResultDisplay = ({ label, probabilities }: ResultDisplayProps) => {
  // Extract probabilities from backend response
  const fakeProb = probabilities?.fake ?? 0;
  const realProb = probabilities?.real ?? 0;

  // Convert from decimal (e.g., 0.97) → percentage
  const fakePercent = fakeProb * 100;
  const realPercent = realProb * 100;

  // Detect fake using emoji label
  const isFake = label?.includes("FAKE");

  return (
    <Card className="border-2 animate-fade-in hover-lift">
      <CardContent className="pt-6">
        {/* Label Display */}
        <div className="flex flex-col items-center justify-center mb-6">
          {isFake ? (
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="h-8 w-8" />
              <h3 className="text-2xl font-bold">{label}</h3>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-success">
              <CheckCircle className="h-8 w-8" />
              <h3 className="text-2xl font-bold">{label}</h3>
            </div>
          )}
        </div>

        {/* Probability Bars (Commented out as per request) */}
        {/*
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Fake Probability
              </span>
              <span className="text-sm font-bold text-destructive">
                {fakePercent.toFixed(2)}%
              </span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-destructive transition-all duration-500 ease-out"
                style={{ width: `${fakePercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Real Probability
              </span>
              <span className="text-sm font-bold text-success">
                {realPercent.toFixed(2)}%
              </span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-success transition-all duration-500 ease-out"
                style={{ width: `${realPercent}%` }}
              />
            </div>
          </div>
        </div>
        */}

        {/* Description Message */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            {isFake
              ? "⚠️ This posting shows signs of being fraudulent. Be cautious and verify through official channels."
              : "✓ This posting appears to be legitimate based on our analysis."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
