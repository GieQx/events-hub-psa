
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export function RegistrationButton() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    jobTitle: "",
    dietaryRestrictions: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // In a real app, you would send this data to your backend
    console.log("Registering user:", formData);
    
    toast.success("Registration successful!", {
      description: "You've been registered for the event. Check your email for confirmation.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      organization: "",
      jobTitle: "",
      dietaryRestrictions: "",
    });
  };

  const isFormValid = formData.name && formData.email;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-rvs-primary text-white hover:bg-rvs-primary/90">
          Register Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register for the event</DialogTitle>
          <DialogDescription>
            Fill out the form below to register for the event.
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
          <div className="grid gap-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
            <Textarea
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleInputChange}
              placeholder="Please let us know if you have any dietary restrictions"
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-rvs-primary hover:bg-rvs-primary/90"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Complete Registration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
