
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollSection } from "@/components/ScrollSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import { ChevronLeft, Plus, Edit, Trash, Save } from "lucide-react";
import cmsService from "@/services/cmsService";
import { CMSAgendaDay, CMSAgendaSession } from "@/types/cms";

const AgendaAdmin = () => {
  const [agendaDays, setAgendaDays] = useState<CMSAgendaDay[]>(cmsService.agenda.getAll());
  const [editingDay, setEditingDay] = useState<CMSAgendaDay | null>(null);
  const [editingSession, setEditingSession] = useState<CMSAgendaSession | null>(null);
  const [isCreatingDay, setIsCreatingDay] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("rvs");
  const events = cmsService.events.getAll();

  const resetForm = () => {
    setEditingDay(null);
    setEditingSession(null);
    setIsCreatingDay(false);
    setIsCreatingSession(false);
  };

  // Day management functions
  const handleCreateDay = () => {
    setIsCreatingDay(true);
    setEditingDay({
      id: crypto.randomUUID(),
      eventId: selectedEventId,
      date: new Date().toISOString().split('T')[0],
      dayNumber: 1,
      sessions: []
    });
    setEditingSession(null);
  };

  const handleEditDay = (day: CMSAgendaDay) => {
    setEditingDay({...day});
    setIsCreatingDay(false);
    setEditingSession(null);
  };

  const handleDeleteDay = (id: string) => {
    if (window.confirm("Are you sure you want to delete this day?")) {
      cmsService.agenda.delete(id);
      setAgendaDays(cmsService.agenda.getAll());
      toast.success("Day deleted successfully");
    }
  };

  const handleSaveDay = () => {
    if (!editingDay) return;
    
    try {
      if (isCreatingDay) {
        cmsService.agenda.create(editingDay);
        toast.success("Day created successfully");
      } else {
        cmsService.agenda.update(editingDay.id, editingDay);
        toast.success("Day updated successfully");
      }
      
      setAgendaDays(cmsService.agenda.getAll());
      resetForm();
    } catch (error) {
      toast.error("Error saving day");
      console.error(error);
    }
  };

  // Session management functions
  const handleCreateSession = () => {
    if (!editingDay) return;
    
    setIsCreatingSession(true);
    setEditingSession({
      id: crypto.randomUUID(),
      eventId: editingDay.eventId,
      dayId: editingDay.id,
      title: "",
      description: "",
      startTime: "09:00",
      endTime: "10:00",
      location: "",
      type: "talk"
    });
  };

  const handleEditSession = (session: CMSAgendaSession) => {
    setEditingSession({...session});
    setIsCreatingSession(false);
  };

  const handleDeleteSession = (sessionId: string) => {
    if (!editingDay) return;
    
    if (window.confirm("Are you sure you want to delete this session?")) {
      const updatedSessions = editingDay.sessions.filter(s => s.id !== sessionId);
      setEditingDay({
        ...editingDay,
        sessions: updatedSessions
      });
      toast.success("Session deleted from day");
    }
  };

  const handleSaveSession = () => {
    if (!editingDay || !editingSession) return;
    
    try {
      const existingSessionIndex = editingDay.sessions.findIndex(s => s.id === editingSession.id);
      let updatedSessions = [...editingDay.sessions];
      
      if (existingSessionIndex >= 0) {
        // Update existing session
        updatedSessions[existingSessionIndex] = editingSession;
      } else {
        // Add new session
        updatedSessions = [...updatedSessions, editingSession];
      }
      
      // Update the day with new sessions
      const updatedDay = {
        ...editingDay,
        sessions: updatedSessions
      };
      
      setEditingDay(updatedDay);
      setEditingSession(null);
      setIsCreatingSession(false);
      
      toast.success("Session saved to day");
    } catch (error) {
      toast.error("Error saving session");
      console.error(error);
    }
  };

  const handleDayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingDay) return;
    
    const { name, value } = e.target;
    setEditingDay({
      ...editingDay,
      [name]: name === 'dayNumber' ? parseInt(value) : value
    });
  };

  const handleSessionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingSession) return;
    
    const { name, value } = e.target;
    setEditingSession({
      ...editingSession,
      [name]: value
    });
  };

  const handleEventChange = (value: string) => {
    setSelectedEventId(value);
  };

  const filteredAgendaDays = selectedEventId ? 
    agendaDays.filter(day => day.eventId === selectedEventId) : 
    agendaDays;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Admin
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Agenda Management</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ScrollSection>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={selectedEventId} onValueChange={handleEventChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map(event => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreateDay} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Day
            </Button>
          </div>

          {!editingDay ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAgendaDays.map((day) => (
                <Card key={day.id}>
                  <CardHeader>
                    <CardTitle>Day {day.dayNumber}: {day.date}</CardTitle>
                    <CardDescription>
                      {day.sessions.length} sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {day.sessions.slice(0, 3).map((session) => (
                        <li key={session.id} className="text-sm">
                          {session.startTime} - {session.endTime}: {session.title}
                        </li>
                      ))}
                      {day.sessions.length > 3 && (
                        <li className="text-sm text-gray-500">+{day.sessions.length - 3} more sessions</li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => handleEditDay(day)} className="flex items-center gap-1">
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteDay(day.id)} className="flex items-center gap-1">
                      <Trash className="h-3 w-3" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {!editingSession ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{isCreatingDay ? "Create New Day" : "Edit Day"}</CardTitle>
                    <CardDescription>
                      {isCreatingDay ? "Add a new day to the agenda" : "Modify day details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input 
                          id="date" 
                          name="date" 
                          type="date"
                          value={editingDay.date} 
                          onChange={handleDayInputChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dayNumber">Day Number</Label>
                        <Input 
                          id="dayNumber" 
                          name="dayNumber" 
                          type="number"
                          min="1"
                          value={editingDay.dayNumber} 
                          onChange={handleDayInputChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventId">Event</Label>
                        <Select 
                          value={editingDay.eventId} 
                          onValueChange={(value) => setEditingDay({...editingDay, eventId: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Event" />
                          </SelectTrigger>
                          <SelectContent>
                            {events.map(event => (
                              <SelectItem key={event.id} value={event.id}>
                                {event.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Sessions</h3>
                        <Button 
                          size="sm"
                          onClick={handleCreateSession}
                          className="flex items-center gap-1"
                        >
                          <Plus className="h-3 w-3" />
                          Add Session
                        </Button>
                      </div>
                      
                      {editingDay.sessions.length === 0 ? (
                        <p className="text-sm text-gray-500">No sessions added yet</p>
                      ) : (
                        <div className="space-y-2">
                          {editingDay.sessions.map(session => (
                            <Card key={session.id} className="overflow-hidden">
                              <div className="flex items-center justify-between p-4">
                                <div>
                                  <h4 className="font-medium">{session.title}</h4>
                                  <p className="text-sm text-gray-500">
                                    {session.startTime} - {session.endTime} | {session.type}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEditSession(session)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteSession(session.id)}
                                  >
                                    <Trash className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={resetForm}>Cancel</Button>
                    <Button onClick={handleSaveDay} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Day
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>{isCreatingSession ? "Add Session" : "Edit Session"}</CardTitle>
                    <CardDescription>
                      {isCreatingSession ? "Add a new session to the day" : "Edit session details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Session Title</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        value={editingSession.title} 
                        onChange={handleSessionInputChange} 
                        placeholder="Session title" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        value={editingSession.description || ""} 
                        onChange={handleSessionInputChange} 
                        placeholder="Session description" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input 
                          id="startTime" 
                          name="startTime" 
                          type="time"
                          value={editingSession.startTime} 
                          onChange={handleSessionInputChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input 
                          id="endTime" 
                          name="endTime" 
                          type="time"
                          value={editingSession.endTime} 
                          onChange={handleSessionInputChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Session Type</Label>
                        <Select 
                          value={editingSession.type} 
                          onValueChange={(value: 'talk' | 'workshop' | 'panel' | 'break' | 'networking' | 'other') => setEditingSession({...editingSession, type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="talk">Talk</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="panel">Panel</SelectItem>
                            <SelectItem value="break">Break</SelectItem>
                            <SelectItem value="networking">Networking</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        name="location" 
                        value={editingSession.location || ""} 
                        onChange={handleSessionInputChange} 
                        placeholder="Room name or location" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="speakerId">Speaker</Label>
                      <Select 
                        value={editingSession.speakerId || ""}
                        onValueChange={(value) => setEditingSession({...editingSession, speakerId: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Speaker (Optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {cmsService.speakers.getByEventId(editingDay.eventId).map(speaker => (
                            <SelectItem key={speaker.id} value={speaker.id}>
                              {speaker.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => {
                      setEditingSession(null);
                      setIsCreatingSession(false);
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveSession} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Session
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </>
          )}
        </ScrollSection>
      </main>
    </div>
  );
};

export default AgendaAdmin;
