import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { EventsManagement } from "@/components/admin/EventsManagement";
import { HomeContentManagement } from "@/components/admin/HomeContentManagement";
import { SpeakersManagement } from "@/components/admin/SpeakersManagement";
import { AgendaManagement } from "@/components/admin/AgendaManagement";
import { PartnersManagement } from "@/components/admin/PartnersManagement";
import { TopicsManagement } from "@/components/admin/TopicsManagement";
import { ResourcesManagement } from "@/components/admin/ResourcesManagement";
import { ChallengesManagement } from "@/components/admin/ChallengesManagement";
import { MarqueeManagement } from "@/components/admin/MarqueeManagement";
import { PressReleaseManagement } from "@/components/admin/PressReleaseManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-gray-100 py-4 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto flex-1 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Event Management Dashboard</h1>
            <p className="text-muted-foreground">Manage all aspects of your events</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {isLoggedIn ? (
          <Tabs defaultValue="events">
            <TabsList className="mb-8 flex flex-wrap gap-1">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="home-content">Home Content</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="partners">Partners</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="press-releases">Press Releases</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="marquee">Marquee</TabsTrigger>
            </TabsList>

            <TabsContent value="events">
              <EventsManagement />
            </TabsContent>

            <TabsContent value="home-content">
              <HomeContentManagement />
            </TabsContent>

            <TabsContent value="speakers">
              <SpeakersManagement />
            </TabsContent>

            <TabsContent value="agenda">
              <AgendaManagement />
            </TabsContent>

            <TabsContent value="partners">
              <PartnersManagement />
            </TabsContent>

            <TabsContent value="topics">
              <TopicsManagement />
            </TabsContent>

            <TabsContent value="press-releases">
              <PressReleaseManagement />
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
          </Tabs>
        ) : (
          <div className="mx-auto mt-12 max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>
                  Please enter your credentials to access the admin dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  {loginError && (
                    <p className="text-center text-sm text-red-500">{loginError}</p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
