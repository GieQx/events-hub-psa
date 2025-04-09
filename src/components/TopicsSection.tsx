
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export interface Topic {
  id: string;
  title: string;
  description: string;
  presenter: string;
  capacity: number;
  enrolled: number;
  type: 'plenary' | 'breakout' | 'workshop' | 'poster';
  time: string;
  location: string;
}

interface TopicsSectionProps {
  topics: Topic[];
  className?: string;
}

export function TopicsSection({ topics, className = "" }: TopicsSectionProps) {
  const [filteredType, setFilteredType] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
  });

  const handleFilterChange = (type: string | null) => {
    setFilteredType(type);
  };

  const filteredTopics = filteredType
    ? topics.filter((topic) => topic.type === filteredType)
    : topics;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnroll = () => {
    // In a real app, you would send this data to your backend
    console.log("Enrolling:", { topic: selectedTopic, user: formData });
    
    toast.success("Successfully enrolled!", {
      description: `You've been enrolled in "${selectedTopic?.title}". Check your email for confirmation.`,
    });
    
    // Reset form
    setFormData({ name: "", email: "", organization: "" });
    setSelectedTopic(null);
  };

  const typeBadgeColor = (type: string) => {
    switch (type) {
      case 'plenary': return 'bg-rvs-primary/10 text-rvs-primary hover:bg-rvs-primary/20';
      case 'breakout': return 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
      case 'workshop': return 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300';
      case 'poster': return 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300';
      default: return '';
    }
  };

  return (
    <div className={className}>
      <h2 className="mb-6 text-center text-3xl font-bold">Available Topics</h2>
      
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <Button 
          variant={filteredType === null ? "default" : "outline"} 
          onClick={() => handleFilterChange(null)}
          className="mb-2"
        >
          All
        </Button>
        <Button 
          variant={filteredType === 'plenary' ? "default" : "outline"} 
          onClick={() => handleFilterChange('plenary')}
          className="mb-2"
        >
          Plenary
        </Button>
        <Button 
          variant={filteredType === 'breakout' ? "default" : "outline"} 
          onClick={() => handleFilterChange('breakout')}
          className="mb-2"
        >
          Breakout
        </Button>
        <Button 
          variant={filteredType === 'workshop' ? "default" : "outline"} 
          onClick={() => handleFilterChange('workshop')}
          className="mb-2"
        >
          Workshop
        </Button>
        <Button 
          variant={filteredType === 'poster' ? "default" : "outline"} 
          onClick={() => handleFilterChange('poster')}
          className="mb-2"
        >
          Poster
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTopics.map((topic) => (
          <Card key={topic.id} className="flex h-full flex-col">
            <CardHeader>
              <div className="flex justify-between">
                <Badge className={typeBadgeColor(topic.type)}>
                  {topic.type.charAt(0).toUpperCase() + topic.type.slice(1)}
                </Badge>
                <span className="text-sm text-gray-500">
                  {topic.enrolled} / {topic.capacity}
                </span>
              </div>
              <CardTitle className="mt-2">{topic.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 dark:text-gray-300">{topic.description}</p>
              <div className="mt-4">
                <p className="text-sm"><strong>Presenter:</strong> {topic.presenter}</p>
                <p className="text-sm"><strong>Time:</strong> {topic.time}</p>
                <p className="text-sm"><strong>Location:</strong> {topic.location}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-rvs-primary hover:bg-rvs-primary/90"
                    onClick={() => setSelectedTopic(topic)}
                    disabled={topic.enrolled >= topic.capacity}
                  >
                    {topic.enrolled >= topic.capacity ? "Session Full" : "Enroll"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enroll in Session</DialogTitle>
                    <DialogDescription>
                      Complete the form below to enroll in "{topic.title}".
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input 
                        id="organization" 
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      className="bg-rvs-primary hover:bg-rvs-primary/90"
                      onClick={handleEnroll}
                      disabled={!formData.name || !formData.email}
                    >
                      Confirm Enrollment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
