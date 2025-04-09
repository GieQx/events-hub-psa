
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Edit, Trash, Save, Clock, CalendarDays } from "lucide-react";
import cmsService from "@/services/cmsService";
import { CMSAgendaDay, CMSAgendaSession } from "@/types/cms";

export function AgendaManagement() {
  const [days, setDays] = useState<CMSAgendaDay[]>(cmsService.agenda.getAll());
  const [sessions, setSessions] = useState<CMSAgendaSession[]>([]);
  const [editingDay, setEditingDay] = useState<CMSAgendaDay | null>(null);
  const [editingSession, setEditingSession] = useState<CMSAgendaSession | null>(null);
  const [isCreatingDay, setIsCreatingDay] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [events, setEvents] = useState(cmsService.events.getAll());
  const [speakers, setSpeakers] = useState(cmsService.speakers.getAll());
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selectedDayId, setSelectedDayId] = useState<string>("");
  const [activeTab, setActiveTab] = useState("days");

  useEffect(() => {
    if (selectedEventId) {
      const filteredDays = cmsService.agenda.getByEventId(selectedEventId);
      setDays(filteredDays);
      if (filteredDays.length > 0 && !selectedDayId) {
        setSelectedDayId(filteredDays[0].id);
      }
    } else {
      setDays(cmsService.agenda.getAll());
      setSelectedDayId("");
    }
  }, [selectedEventId]);

  useEffect(() => {
    // Extract all sessions from the days
    if (selectedDayId) {
      const day = days.find(d => d.id === selectedDayId);
      if (day) {
        setSessions(day.sessions || []);
      } else {
        setSessions([]);
      }
    } else {
      setSessions([]);
    }
  }, [selectedDayId, days]);

  const resetDayForm = () => {
    setEditingDay(null);
    setIsCreatingDay(false);
  };

  const resetSessionForm = () => {
    setEditingSession(null);
    setIsCreatingSession(false);
  };

  const handleCreateDay = () => {
    setIsCreatingDay(true);
    setEditingDay({
      id: crypto.randomUUID(),
      eventId: selectedEventId || events[0]?.id || "",
      date: new Date().toISOString().split('T')[0],
      dayNumber: days.length + 1,
      sessions: []
    });
  };

  const handleCreateSession = () => {
    if (!selectedDayId) {
      toast.error("Please select a day first");
      return;
    }
    
    setIsCreatingSession(true);
    setEditingSession({
      id: crypto.randomUUID(),
      eventId: selectedEventId || events[0]?.id || "",
      dayId: selectedDayId,
      title: "",
      startTime: "09:00",
      endTime: "10:00",
      type: "talk"
    });
  };

  const handleEditDay = (day: CMSAgendaDay) => {
    setEditingDay({...day});
    setIsCreatingDay(false);
  };

  const handleEditSession = (session: CMSAgendaSession) => {
    setEditingSession({...session});
    setIsCreatingSession(false);
  };

  const handleDeleteDay = (id: string) => {
    if (window.confirm("Are you sure you want to delete this day? All sessions will be deleted as well.")) {
      cmsService.agenda.delete(id);
      const updatedDays = selectedEventId 
        ? cmsService.agenda.getByEventId(selectedEventId) 
        : cmsService.agenda.getAll();
      setDays(updatedDays);
      
      if (selectedDayId === id) {
        setSelectedDayId(updatedDays.length > 0 ? updatedDays[0].id : "");
      }
      
      toast.success("Day deleted successfully");
    }
  };

  const handleDeleteSession = (session: CMSAgendaSession) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      // Find the day that contains this session
      const day = days.find(d => d.id === session.dayId);
      if (day) {
        // Remove the session from the day
        const updatedSessions = day.sessions.filter(s => s.id !== session.id);
        const updatedDay = { ...day, sessions: updatedSessions };
        
        // Update the day
        cmsService.agenda.update(day.id, updatedDay);
        
        // Refresh the days and sessions
        const updatedDays = selectedEventId 
          ? cmsService.agenda.getByEventId(selectedEventId) 
          : cmsService.agenda.getAll();
        setDays(updatedDays);
        
        if (selectedDayId === day.id) {
          setSessions(updatedSessions);
        }
        
        toast.success("Session deleted successfully");
      }
    }
  };

  const handleSaveDay = () => {
    if (!editingDay) return;
    
    if (!editingDay.date) {
      toast.error("Date is a required field");
      return;
    }
    
    try {
      if (isCreatingDay) {
        cmsService.agenda.create(editingDay);
        toast.success("Day created successfully");
      } else {
        cmsService.agenda.update(editingDay.id, editingDay);
        toast.success("Day updated successfully");
      }
      
      const updatedDays = selectedEventId 
        ? cmsService.agenda.getByEventId(selectedEventId) 
        : cmsService.agenda.getAll();
      setDays(updatedDays);
      resetDayForm();
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSaveSession = () => {
    if (!editingSession || !selectedDayId) return;
    
    if (!editingSession.title || !editingSession.startTime || !editingSession.endTime) {
      toast.error("Title, start time, and end time are required fields");
      return;
    }
    
    try {
      // Find the day to update
      const day = days.find(d => d.id === selectedDayId);
      if (!day) {
        toast.error("Day not found");
        return;
      }
      
      let updatedSessions: CMSAgendaSession[];
      
      if (isCreatingSession) {
        // Add new session
        updatedSessions = [...day.sessions, editingSession];
      } else {
        // Update existing session
        updatedSessions = day.sessions.map(s => 
          s.id === editingSession.id ? editingSession : s
        );
      }
      
      // Sort sessions by start time
      updatedSessions.sort((a, b) => {
        return a.startTime.localeCompare(b.startTime);
      });
      
      // Update the day with new sessions
      const updatedDay = { ...day, sessions: updatedSessions };
      cmsService.agenda.update(day.id, updatedDay);
      
      // Refresh the days and sessions
      const updatedDays = selectedEventId 
        ? cmsService.agenda.getByEventId(selectedEventId) 
        : cmsService.agenda.getAll();
      setDays(updatedDays);
      setSessions(updatedSessions);
      
      toast.success(`Session ${isCreatingSession ? 'created' : 'updated'} successfully`);
      resetSessionForm();
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingDay) return;
    
    const { name, value } = e.target;
    setEditingDay({
      ...editingDay,
      [name]: value
    });
  };

  const handleSessionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingSession) return;
    
    const { name, value } = e.target;
    setEditingSession({
      ...editingSession,
      [name]: value
    });
  };

  const handleDayEventChange = (value: string) => {
    if (!editingDay) return;
    
    setEditingDay({
      ...editingDay,
      eventId: value
    });
  };

  const handleSessionSelectChange = (name: string, value: string) => {
    if (!editingSession) return;
    
    setEditingSession({
      ...editingSession,
      [name]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Agenda Management</h2>
        <div className="w-56">
          <Select value={selectedEventId} onValueChange={setSelectedEventId}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Events</SelectItem>
              {events.map(event => (
                <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="days">Days</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="days" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Event Days</h3>
            <Button onClick={handleCreateDay} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Day
            </Button>
          </div>
          
          {editingDay ? (
            <Card>
              <CardHeader>
                <CardTitle>{isCreatingDay ? "Create New Day" : "Edit Day"}</CardTitle>
                <CardDescription>
                  {isCreatingDay ? "Add a new day to the agenda" : "Modify day details"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventId">Event</Label>
                    <Select 
                      value={editingDay.eventId} 
                      onValueChange={handleDayEventChange}
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
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date" 
                      name="date" 
                      type="date"
                      value={editingDay.date} 
                      onChange={handleDayInputChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dayNumber">Day Number</Label>
                  <Input 
                    id="dayNumber" 
                    name="dayNumber" 
                    type="number"
                    value={editingDay.dayNumber.toString()} 
                    onChange={handleDayInputChange}
                    min="1"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetDayForm}>Cancel</Button>
                <Button onClick={handleSaveDay} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Day
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {days.length > 0 ? (
                days.map((day) => (
                  <Card 
                    key={day.id} 
                    className={`cursor-pointer ${selectedDayId === day.id ? 'border-2 border-blue-500' : ''}`}
                    onClick={() => setSelectedDayId(day.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        <CardTitle>Day {day.dayNumber}</CardTitle>
                      </div>
                      <CardDescription>{new Date(day.date).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <span className="font-semibold">{day.sessions?.length || 0} sessions</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Event: {events.find(e => e.id === day.eventId)?.title || day.eventId}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        handleEditDay(day);
                      }} className="flex items-center gap-1">
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDay(day.id);
                      }} className="flex items-center gap-1">
                        <Trash className="h-3 w-3" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  {selectedEventId 
                    ? "No days found for this event. Add some days!" 
                    : "No days found. Add some days!"}
                </div>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sessions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">Sessions</h3>
              {selectedDayId && (
                <Select value={selectedDayId} onValueChange={setSelectedDayId}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day.id} value={day.id}>
                        Day {day.dayNumber} - {new Date(day.date).toLocaleDateString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <Button 
              onClick={handleCreateSession} 
              className="flex items-center gap-2"
              disabled={!selectedDayId}
            >
              <Plus className="h-4 w-4" />
              Add Session
            </Button>
          </div>
          
          {!selectedDayId && (
            <div className="text-center py-8 text-gray-500">
              Please select a day first to manage sessions
            </div>
          )}
          
          {selectedDayId && editingSession ? (
            <Card>
              <CardHeader>
                <CardTitle>{isCreatingSession ? "Create New Session" : "Edit Session"}</CardTitle>
                <CardDescription>
                  {isCreatingSession ? "Add a new session to the agenda" : "Modify session details"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Session Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={editingSession.title} 
                    onChange={handleSessionInputChange} 
                    placeholder="Session title" 
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={editingSession.description || ""} 
                    onChange={handleSessionInputChange} 
                    placeholder="Session description" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input 
                      id="startTime" 
                      name="startTime" 
                      type="time"
                      value={editingSession.startTime} 
                      onChange={handleSessionInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input 
                      id="endTime" 
                      name="endTime" 
                      type="time"
                      value={editingSession.endTime} 
                      onChange={handleSessionInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Session Type</Label>
                    <Select 
                      value={editingSession.type} 
                      onValueChange={(value) => handleSessionSelectChange("type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select session type" />
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
                  <div>
                    <Label htmlFor="speakerId">Speaker (Optional)</Label>
                    <Select 
                      value={editingSession.speakerId || ""}
                      onValueChange={(value) => handleSessionSelectChange("speakerId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a speaker" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {speakers
                          .filter(s => s.eventId === selectedEventId)
                          .map(speaker => (
                            <SelectItem key={speaker.id} value={speaker.id}>{speaker.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    value={editingSession.location || ""} 
                    onChange={handleSessionInputChange} 
                    placeholder="Room or location" 
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetSessionForm}>Cancel</Button>
                <Button onClick={handleSaveSession} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Session
                </Button>
              </CardFooter>
            </Card>
          ) : (
            selectedDayId && (
              <div className="space-y-2">
                {sessions.length > 0 ? (
                  sessions.map((session) => (
                    <Card key={session.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{session.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {session.startTime} - {session.endTime}
                            </CardDescription>
                          </div>
                          <div>
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {session.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        {session.description && (
                          <p className="text-sm mb-2">{session.description}</p>
                        )}
                        {session.location && (
                          <p className="text-xs text-gray-500">Location: {session.location}</p>
                        )}
                        {session.speakerId && (
                          <p className="text-xs text-gray-500">
                            Speaker: {speakers.find(s => s.id === session.speakerId)?.name || "Unknown"}
                          </p>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditSession(session)} className="flex items-center gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteSession(session)} className="flex items-center gap-1">
                          <Trash className="h-3 w-3" />
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No sessions found for this day. Add some sessions!
                  </div>
                )}
              </div>
            )
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
