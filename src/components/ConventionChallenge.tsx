
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Trophy } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  steps: Array<{
    id: string;
    description: string;
    points: number;
  }>;
  reward: string;
}

interface ConventionChallengeProps {
  challenge: Challenge | any;
  className?: string;
}

export function ConventionChallenge({ challenge, className = "" }: ConventionChallengeProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Ensure challenge and challenge.steps exist before using reduce
  const steps = challenge?.steps || [];
  const totalPoints = steps.reduce((sum, step) => sum + step.points, 0);
  const earnedPoints = steps
    .filter((step) => completedSteps.includes(step.id))
    .reduce((sum, step) => sum + step.points, 0);
  
  const progress = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

  const toggleStep = (stepId: string) => {
    if (isCompleted) return;
    
    setCompletedSteps((prev) => {
      if (prev.includes(stepId)) {
        return prev.filter((id) => id !== stepId);
      } else {
        const newCompleted = [...prev, stepId];
        // Check if all steps are completed
        if (newCompleted.length === steps.length && steps.length > 0) {
          setTimeout(() => {
            setIsCompleted(true);
            toast.success("Challenge completed!", {
              description: `Congratulations! You've earned ${totalPoints} points and unlocked: ${challenge?.reward || 'a reward'}`,
            });
          }, 500);
        }
        return newCompleted;
      }
    });
  };

  const resetChallenge = () => {
    setCompletedSteps([]);
    setIsCompleted(false);
  };

  // If challenge is not provided or malformed, render a fallback
  if (!challenge || !challenge.steps) {
    return (
      <div className={className}>
        <h2 className="mb-6 text-center text-3xl font-bold">Convention Challenge</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Challenge Not Available</CardTitle>
            <CardDescription>Check back later for challenges!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500">No active challenges at this time</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Convention Challenge</h2>
      
      <Card className={`transition-all duration-300 ${isCompleted ? 'border-rvs-primary shadow-lg' : ''}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{challenge.title || 'Challenge'}</CardTitle>
            <Badge 
              variant={isCompleted ? "default" : "outline"}
              className={isCompleted ? "bg-rvs-primary" : ""}
            >
              {earnedPoints} / {totalPoints} Points
            </Badge>
          </div>
          <CardDescription>{challenge.description || 'Complete this challenge to earn rewards'}</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-6 h-2" />
          
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.id} 
                className={`flex cursor-pointer items-start space-x-2 rounded-md border p-4 transition-all
                  ${completedSteps.includes(step.id) 
                    ? 'border-rvs-primary bg-rvs-primary/5' 
                    : 'hover:border-gray-400 hover:bg-gray-50 dark:hover:border-gray-600 dark:hover:bg-gray-900/50'
                  }
                `}
                onClick={() => toggleStep(step.id)}
              >
                <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full 
                  ${completedSteps.includes(step.id) 
                    ? 'bg-rvs-primary text-white' 
                    : 'border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {completedSteps.includes(step.id) && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="h-3 w-3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`${completedSteps.includes(step.id) ? 'font-medium' : ''}`}>
                    {step.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {step.points} points
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {isCompleted && (
            <div className="mt-6 flex items-center justify-center rounded-md bg-rvs-primary/10 p-4 text-center">
              <div>
                <div className="mb-2 flex justify-center">
                  <Trophy className="h-8 w-8 text-rvs-primary" />
                </div>
                <h3 className="mb-1 text-lg font-semibold">Challenge Completed!</h3>
                <p className="text-sm">You've earned {totalPoints} points</p>
                <p className="mt-2 text-sm font-medium">Reward: {challenge.reward || 'Congratulations!'}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {isCompleted ? (
            <Button variant="outline" onClick={resetChallenge} className="w-full">
              Reset Challenge
            </Button>
          ) : (
            <div className="w-full text-center text-sm text-gray-500">
              Complete all steps to earn your reward
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
