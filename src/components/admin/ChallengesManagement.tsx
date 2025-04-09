
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Edit, Trash, Save, Trophy, PlusCircle, MinusCircle } from "lucide-react";
import cmsService from "@/services/cmsService";
import { Challenge, ChallengeStep } from "@/types/challenge";

export function ChallengesManagement() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [events, setEvents] = useState(cmsService.events.getAll());
  const [selectedEventId, setSelectedEventId] = useState<string>("all");

  useEffect(() => {
    // Initialize the challenges state
    let allChallenges: Challenge[] = [];
    try {
      allChallenges = cmsService.challenges.getAll();
    } catch (error) {
      // If the challenges service doesn't exist yet, we'll create it
      console.log("Challenges service not initialized yet");
      allChallenges = [];
    }
    
    if (selectedEventId === "all") {
      setChallenges(allChallenges);
    } else {
      setChallenges(allChallenges.filter(challenge => challenge.eventId === selectedEventId));
    }
  }, [selectedEventId]);
  
  const resetForm = () => {
    setEditingChallenge(null);
    setIsCreating(false);
  };

  const handleCreateChallenge = () => {
    setIsCreating(true);
    setEditingChallenge({
      id: crypto.randomUUID(),
      eventId: selectedEventId !== "all" ? selectedEventId : events[0]?.id || "",
      title: "New Challenge",
      description: "Complete this challenge to earn rewards",
      steps: [
        {
          id: crypto.randomUUID(),
          description: "First step",
          points: 10
        }
      ],
      reward: "Special badge",
      active: true
    });
  };

  const handleEditChallenge = (challenge: Challenge) => {
    setEditingChallenge({...challenge});
    setIsCreating(false);
  };

  const handleDeleteChallenge = (id: string) => {
    if (window.confirm("Are you sure you want to delete this challenge?")) {
      try {
        cmsService.challenges.delete(id);
        setChallenges(prev => prev.filter(challenge => challenge.id !== id));
        toast.success("Challenge deleted successfully");
      } catch (error) {
        toast.error("Failed to delete challenge");
      }
    }
  };

  const handleSaveChallenge = () => {
    if (!editingChallenge) return;
    
    if (!editingChallenge.title || !editingChallenge.description || editingChallenge.steps.length === 0) {
      toast.error("Title, description, and at least one step are required");
      return;
    }
    
    try {
      if (isCreating) {
        cmsService.challenges.create(editingChallenge);
        toast.success("Challenge created successfully");
      } else {
        cmsService.challenges.update(editingChallenge.id, editingChallenge);
        toast.success("Challenge updated successfully");
      }
      
      if (selectedEventId === "all") {
        setChallenges(cmsService.challenges.getAll());
      } else {
        setChallenges(cmsService.challenges.getByEventId(selectedEventId));
      }
      resetForm();
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingChallenge) return;
    
    const { name, value } = e.target;
    setEditingChallenge({
      ...editingChallenge,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!editingChallenge) return;
    
    setEditingChallenge({
      ...editingChallenge,
      [name]: value
    });
  };

  const handleToggleActive = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingChallenge) return;
    
    setEditingChallenge({
      ...editingChallenge,
      active: e.target.checked
    });
  };

  const handleAddStep = () => {
    if (!editingChallenge) return;
    
    setEditingChallenge({
      ...editingChallenge,
      steps: [
        ...editingChallenge.steps,
        {
          id: crypto.randomUUID(),
          description: "",
          points: 10
        }
      ]
    });
  };

  const handleRemoveStep = (stepId: string) => {
    if (!editingChallenge) return;
    
    setEditingChallenge({
      ...editingChallenge,
      steps: editingChallenge.steps.filter(step => step.id !== stepId)
    });
  };

  const handleStepChange = (stepId: string, field: keyof ChallengeStep, value: string | number) => {
    if (!editingChallenge) return;
    
    setEditingChallenge({
      ...editingChallenge,
      steps: editingChallenge.steps.map(step => {
        if (step.id === stepId) {
          return {
            ...step,
            [field]: value
          };
        }
        return step;
      })
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Challenges Management</h2>
        <div className="flex items-center gap-4">
          <div className="w-56">
            <Select value={selectedEventId} onValueChange={setSelectedEventId}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map(event => (
                  <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleCreateChallenge} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Challenge
          </Button>
        </div>
      </div>

      {editingChallenge ? (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? "Create New Challenge" : "Edit Challenge"}</CardTitle>
            <CardDescription>
              {isCreating ? "Add a new challenge to the platform" : "Modify challenge details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventId">Event</Label>
                <Select 
                  value={editingChallenge.eventId} 
                  onValueChange={(value) => handleSelectChange("eventId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map(event => (
                      <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={editingChallenge.title} 
                  onChange={handleInputChange} 
                  placeholder="Challenge title" 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={editingChallenge.description} 
                onChange={handleInputChange} 
                placeholder="Challenge description" 
              />
            </div>

            <div>
              <Label htmlFor="reward">Reward</Label>
              <Input 
                id="reward" 
                name="reward" 
                value={editingChallenge.reward} 
                onChange={handleInputChange} 
                placeholder="e.g. Special badge, $100 gift card, etc." 
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                checked={editingChallenge.active}
                onChange={handleToggleActive}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="active">Active Challenge</Label>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Challenge Steps</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddStep} 
                  className="flex items-center gap-1"
                >
                  <PlusCircle className="h-3 w-3" />
                  Add Step
                </Button>
              </div>
              
              <div className="space-y-3">
                {editingChallenge.steps.map((step, index) => (
                  <div key={step.id} className="grid grid-cols-12 gap-2 items-start p-3 border rounded-md">
                    <div className="col-span-1 text-center pt-2 font-semibold text-gray-500">
                      {index + 1}
                    </div>
                    <div className="col-span-7">
                      <Input 
                        value={step.description} 
                        onChange={(e) => handleStepChange(step.id, 'description', e.target.value)}
                        placeholder="Step description" 
                      />
                    </div>
                    <div className="col-span-3">
                      <Input 
                        type="number" 
                        value={step.points.toString()} 
                        onChange={(e) => handleStepChange(step.id, 'points', parseInt(e.target.value) || 0)}
                        placeholder="Points" 
                        min="0"
                      />
                    </div>
                    <div className="col-span-1 text-center">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveStep(step.id)}
                        disabled={editingChallenge.steps.length <= 1}
                      >
                        <MinusCircle className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSaveChallenge} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Challenge
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.length > 0 ? (
            challenges.map((challenge) => (
              <Card key={challenge.id} className={`${challenge.active ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-gray-300'}`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Trophy className={`h-5 w-5 ${challenge.active ? 'text-green-500' : 'text-gray-400'}`} />
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-semibold">{challenge.steps.length} steps</span> - 
                      Total: {challenge.steps.reduce((sum, step) => sum + step.points, 0)} points
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Reward:</span> {challenge.reward}
                    </div>
                    <div className="text-xs text-gray-500">
                      Event: {events.find(e => e.id === challenge.eventId)?.title || challenge.eventId}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditChallenge(challenge)} className="flex items-center gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteChallenge(challenge.id)} className="flex items-center gap-1">
                    <Trash className="h-3 w-3" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              {selectedEventId !== "all"
                ? "No challenges found for this event. Add some challenges!"
                : "No challenges found. Add some challenges!"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
