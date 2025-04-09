
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventPage from "./pages/EventPage";
import SpeakersPage from "./pages/SpeakersPage";
import AgendaPage from "./pages/AgendaPage";
import TopicsPage from "./pages/TopicsPage";
import ResourcesPage from "./pages/ResourcesPage";
import AttendeeGuidePage from "./pages/AttendeeGuidePage";
import FaqsPage from "./pages/FaqsPage";
import AdminPage from "./pages/AdminPage";
import SpeakersAdmin from "./pages/admin/SpeakersAdmin";
import AgendaAdmin from "./pages/admin/AgendaAdmin";
import PartnersAdmin from "./pages/admin/PartnersAdmin";
import ResourcesAdmin from "./pages/admin/ResourcesAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events/:eventId" element={<EventPage />} />
          <Route path="/events/:eventId/speakers" element={<SpeakersPage />} />
          <Route path="/events/:eventId/agenda" element={<AgendaPage />} />
          <Route path="/events/:eventId/topics" element={<TopicsPage />} />
          <Route path="/events/:eventId/resources" element={<ResourcesPage />} />
          <Route path="/events/:eventId/guide" element={<AttendeeGuidePage />} />
          <Route path="/events/:eventId/faqs" element={<FaqsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/speakers" element={<SpeakersAdmin />} />
          <Route path="/admin/agenda" element={<AgendaAdmin />} />
          <Route path="/admin/partners" element={<PartnersAdmin />} />
          <Route path="/admin/resources" element={<ResourcesAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
