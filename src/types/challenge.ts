
export interface ChallengeStep {
  id: string;
  description: string;
  points: number;
}

export interface Challenge {
  id: string;
  eventId: string;
  title: string;
  description: string;
  steps: ChallengeStep[];
  reward: string;
  active: boolean;
}
