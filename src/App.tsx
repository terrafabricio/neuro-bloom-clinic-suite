
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { DevModeToggle } from "@/components/layout/DevModeToggle";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Appointments from "@/pages/Appointments";
import Patients from "@/pages/Patients";
import Professionals from "@/pages/Professionals";
import Financial from "@/pages/Financial";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DevModeToggle />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="patients" element={<Patients />} />
            <Route path="professionals" element={<Professionals />} />
            <Route path="financial" element={<Financial />} />
            <Route path="reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Relatórios</h1><p>Módulo em desenvolvimento...</p></div>} />
            <Route path="events" element={<div className="p-6"><h1 className="text-2xl font-bold">Eventos</h1><p>Módulo em desenvolvimento...</p></div>} />
            <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Configurações</h1><p>Módulo em desenvolvimento...</p></div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
