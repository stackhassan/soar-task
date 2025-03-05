import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Suspense, lazy } from 'react';

// Lazy load page components
const NotFound = lazy(() => import("@/pages/not-found"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Account = lazy(() => import("@/pages/account"));
const Settings = lazy(() => import("@/pages/settings"));
const Transactions = lazy(() => import("@/pages/transactions"));
const Investments = lazy(() => import("@/pages/investments"));
const CreditCards = lazy(() => import("@/pages/credit-cards"));
const Loans = lazy(() => import("@/pages/loans"));
const Services = lazy(() => import("@/pages/services"));
const Privileges = lazy(() => import("@/pages/privileges"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">Loading...</div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/account" element={<Account />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/credit-cards" element={<CreditCards />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/services" element={<Services />} />
        <Route path="/privileges" element={<Privileges />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router />
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
