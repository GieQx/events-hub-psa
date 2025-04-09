
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeContentManagement } from "@/components/admin/HomeContentManagement";
import { SpeakersManagement } from "@/components/admin/SpeakersManagement";
import { AgendaManagement } from "@/components/admin/AgendaManagement";
import { TopicsManagement } from "@/components/admin/TopicsManagement";
import { PartnersManagement } from "@/components/admin/PartnersManagement";
import { ResourcesManagement } from "@/components/admin/ResourcesManagement";
import { ChallengesManagement } from "@/components/admin/ChallengesManagement";
import { MarqueeManagement } from "@/components/admin/MarqueeManagement";
import { AttendeeGuideManagement } from "@/components/admin/AttendeeGuideManagement";
import EventsManagement from "@/components/admin/EventsManagement";
import { Card, CardContent } from "@/components/ui/card";
import { isAdmin, useAdminAuth } from "@/utils/adminAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard, Users, Calendar, Book, Handshake, FileText, Trophy, Megaphone, Map, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminLoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("cms_admin_auth", "true");
      onLogin();
      toast.success("Successfully logged in as admin");
    } else {
      setError("Invalid password");
      toast.error("Invalid password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="mb-6 text-center text-2xl font-bold">Admin Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="mb-2 block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
                placeholder="Enter admin password"
                required
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
              Hint: The password is "admin123"
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <Button variant="outline" className="mr-4 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <Button
          variant="destructive"
          onClick={() => {
            localStorage.removeItem("cms_admin_auth");
            window.location.reload();
            toast.info("Logged out successfully");
          }}
        >
          Logout
        </Button>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden md:inline">Home</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="hidden md:inline">Events</span>
          </TabsTrigger>
          <TabsTrigger value="speakers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Speakers</span>
          </TabsTrigger>
          <TabsTrigger value="agenda" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden md:inline">Agenda</span>
          </TabsTrigger>
          <TabsTrigger value="topics" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span className="hidden md:inline">Topics</span>
          </TabsTrigger>
          <TabsTrigger value="partners" className="flex items-center gap-2">
            <Handshake className="h-4 w-4" />
            <span className="hidden md:inline">Partners</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden md:inline">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="marquee" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            <span className="hidden md:inline">Marquee</span>
          </TabsTrigger>
          <TabsTrigger value="guide" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            <span className="hidden md:inline">Guide</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <HomeContentManagement />
        </TabsContent>
        
        <TabsContent value="events">
          <EventsManagement />
        </TabsContent>
        
        <TabsContent value="speakers">
          <SpeakersManagement />
        </TabsContent>
        
        <TabsContent value="agenda">
          <AgendaManagement />
        </TabsContent>
        
        <TabsContent value="topics">
          <TopicsManagement />
        </TabsContent>
        
        <TabsContent value="partners">
          <PartnersManagement />
        </TabsContent>
        
        <TabsContent value="resources">
          <ResourcesManagement />
        </TabsContent>
        
        <TabsContent value="challenges">
          <ChallengesManagement />
        </TabsContent>
        
        <TabsContent value="marquee">
          <MarqueeManagement />
        </TabsContent>
        
        <TabsContent value="guide">
          <AttendeeGuideManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

function AdminPage() {
  const { authenticated, setAuthenticated } = useAdminAuth();

  if (!authenticated) {
    return <AdminLoginForm onLogin={() => setAuthenticated(true)} />;
  }

  return <AdminPanel />;
}

export default AdminPage;
