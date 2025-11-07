import { AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ResultDisplayProps {
  label: string;
  fakeProb: number;
  realProb: number;
}

const ResultDisplay = ({ label, fakeProb, realProb }: ResultDisplayProps) => {
  const isFake = label === "Fake Job Posting";
  
  return (
    <Card className="border-2 animate-fade-in hover-lift">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center mb-6">
          {isFake ? (
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="h-8 w-8" />
              <h3 className="text-2xl font-bold">Fake Job Posting Detected</h3>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-success">
              <CheckCircle className="h-8 w-8" />
              <h3 className="text-2xl font-bold">Legitimate Posting</h3>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Fake Probability
              </span>
              <span className="text-sm font-bold text-destructive">
                {fakeProb.toFixed(2)}%
              </span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-destructive transition-all duration-500 ease-out"
                style={{ width: `${fakeProb}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Real Probability
              </span>
              <span className="text-sm font-bold text-success">
                {realProb.toFixed(2)}%
              </span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-success transition-all duration-500 ease-out"
                style={{ width: `${realProb}%` }}
              />
            </div>
          </div>
        </div>
        
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
