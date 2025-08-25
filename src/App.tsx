
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Integrations from "./pages/Integrations";
import ChatConsole from "./pages/ChatConsole";
import UseCases from "./pages/UseCases";
import PricingPlans from "./pages/PricingPlans";
import Credentials from "./pages/Credentials";
import Support from "./pages/Support";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="chat" element={<ChatConsole />} />
            <Route path="use-cases" element={<UseCases />} />
            <Route path="pricing" element={<PricingPlans />} />
            <Route path="credentials" element={<Credentials />} />
            <Route path="support" element={<Support />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
