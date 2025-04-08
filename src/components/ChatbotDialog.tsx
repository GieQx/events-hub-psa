
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, ArrowUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ChatOption {
  id: string;
  text: string;
  responses: string[];
  followUp?: ChatOption[];
}

interface ChatbotDialogProps {
  eventName: string;
  options: ChatOption[];
  eventId?: string;
}

export function ChatbotDialog({ eventName, options, eventId = "rvs" }: ChatbotDialogProps) {
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<ChatOption[]>(options);
  const [conversation, setConversation] = useState<{
    text: string;
    isUser: boolean;
  }[]>([
    {
      text: `Welcome to the ${eventName} chatbot assistant! How can I help you today?`,
      isUser: false,
    },
  ]);

  // Get the correct event color
  const getEventColor = () => {
    switch(eventId) {
      case "rvs": return "rvs-primary";
      case "bms": return "bms-primary";
      case "sm": return "sm-primary";
      case "cs": return "cs-primary";
      default: return "rvs-primary";
    }
  };

  const handleOptionClick = (option: ChatOption) => {
    // Add user message
    setConversation((prev) => [
      ...prev,
      { text: option.text, isUser: true },
    ]);

    // Get random response from available responses
    const responseIndex = Math.floor(Math.random() * option.responses.length);
    const botResponse = option.responses[responseIndex];

    // Add bot response after a short delay
    setTimeout(() => {
      setConversation((prev) => [
        ...prev,
        { text: botResponse, isUser: false },
      ]);

      // Set follow-up options if available
      if (option.followUp) {
        setCurrentOptions(option.followUp);
      } else {
        // Reset to original options if no follow-up
        setCurrentOptions(options);
      }
    }, 500);
  };

  const startChat = () => {
    setChatStarted(true);
  };

  const resetChat = () => {
    // Don't reset chatStarted - just reset the conversation
    setConversation([
      {
        text: `Welcome to the ${eventName} chatbot assistant! How can I help you today?`,
        isUser: false,
      },
    ]);
    setCurrentOptions(options);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="icon" 
          className={`fixed bottom-24 right-6 h-14 w-14 rounded-full bg-${getEventColor()} shadow-lg hover:bg-${getEventColor()}/90 md:bottom-6`}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chatbot</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{eventName} Chatbot</DialogTitle>
          <DialogDescription>
            Ask questions about the event and get quick answers.
          </DialogDescription>
        </DialogHeader>
        
        {!chatStarted ? (
          <div className="space-y-4">
            <div className="text-sm">
              <p className="mb-4">
                This chatbot can help you with questions about the event, schedule, venue, and more.
                Before proceeding, please agree to the following terms:
              </p>
              <div className="rounded-md border p-4">
                <p className="text-xs text-gray-500">
                  By using this chatbot, you agree that:
                </p>
                <ul className="ml-4 mt-2 list-disc text-xs text-gray-500">
                  <li>Information provided is for convenience only</li>
                  <li>The chatbot may not have all information you need</li>
                  <li>For critical questions, please contact event organizers directly</li>
                  <li>Your interactions may be recorded for service improvement</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreementChecked}
                onCheckedChange={(checked) => setAgreementChecked(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions
              </Label>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={startChat} 
                disabled={!agreementChecked}
                className={`bg-${getEventColor()} hover:bg-${getEventColor()}/90`}
              >
                Start Chat
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="flex h-[400px] flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.isUser
                        ? `bg-${getEventColor()} text-white`
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {currentOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer p-3 transition-colors hover:bg-${getEventColor()}/10 dark:hover:bg-gray-800`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.text}
                  </Card>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetChat}
                >
                  Reset Chat
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
