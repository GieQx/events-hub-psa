
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Trophy, Clock, Users } from "lucide-react";
import { getEventColor, getEventTextColor } from "@/utils/eventHelpers";

interface Challenge {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  participants?: number;
  progress?: number;
  prizes?: string[];
}

interface ConventionChallengeProps {
  challenge: Challenge | null;
  className?: string;
  eventId?: string;
}

export function ConventionChallenge({ 
  challenge, 
  className = "",
  eventId = "nccrvs"
}: ConventionChallengeProps) {
  if (!challenge) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Convention Challenge</h2>
      
      <Card className="overflow-hidden">
        <div className={`h-2 ${getEventColor(eventId)}`}></div>
        <CardContent className="p-6">
          <h3 className={`mb-3 text-xl font-bold ${getEventTextColor(eventId)}`}>{challenge.title}</h3>
          
          <p className="mb-6 text-gray-700 dark:text-gray-300">{challenge.description}</p>
          
          <div className="mb-6 flex flex-wrap gap-6">
            {challenge.deadline && (
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Deadline</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.deadline}</p>
                </div>
              </div>
            )}
            
            {challenge.participants !== undefined && (
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Participants</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.participants} registered</p>
                </div>
              </div>
            )}
          </div>
          
          {challenge.progress !== undefined && (
            <div className="mb-6">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">Challenge Progress</span>
                <span>{challenge.progress}%</span>
              </div>
              <Progress value={challenge.progress} className="h-2" />
            </div>
          )}
          
          {challenge.prizes && challenge.prizes.length > 0 && (
            <div className="mb-6">
              <p className="mb-2 font-medium">Prizes</p>
              <ul className="space-y-1 text-sm">
                {challenge.prizes.map((prize, index) => (
                  <li key={index} className="flex items-start">
                    <Trophy className="mr-2 mt-0.5 h-4 w-4 text-amber-500" />
                    <span>{prize}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <Button className={`w-full ${getEventColor(eventId)} text-white hover:opacity-90`}>
            <span>Join the Challenge</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
