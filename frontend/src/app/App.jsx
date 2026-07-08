import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, AppContext } from './providers/AppContext';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Splash from '../pages/Splash/Splash';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import CustomerDashboard from '../pages/CustomerDashboard/CustomerDashboard';
import ServiceRequestList from '../pages/ServiceRequestList/ServiceRequestList';
import EngineerReviewHistory from '../pages/EngineerReviewHistory/EngineerReviewHistory';
import RequestDetails from '../pages/RequestDetails/RequestDetails';
import EngineerDashboard from '../pages/EngineerDashboard/EngineerDashboard';
import Engineers from '../pages/Engineers/Engineers';
import Profile from '../pages/Profile/Profile';
import Settings from '../pages/Settings/Settings';

// New Pages
import Landing from '../pages/Landing/Landing';
import Billing from '../pages/Billing/Billing';
import Notifications from '../pages/Notifications/Notifications';
import About from '../pages/About/About';
import ServicesPage from '../pages/Services/ServicesPage';
import AILabPage from '../pages/AIFeatures/AILabPage';
import ReviewsPage from '../pages/Reviews/ReviewsPage';
import PersonnelPage from '../pages/MeetTeam/MeetTeamPage';
import Privacy from '../pages/Privacy/Privacy';
import Terms from '../pages/Terms/Terms';
import Contact from '../pages/Contact/Contact';
import FAQ from '../pages/FAQ/FAQ';
import NotFound from '../pages/NotFound/NotFound';
import AI from '../pages/AI/AI';

// Layout Components
import Sidebar from '../widgets/Sidebar';
import Navbar from '../widgets/Navbar';
import PublicLayout from '../widgets/PublicLayout';
import CustomCursor from '../shared/ui/CustomCursor/CustomCursor';

// Public layout wrapper
const PublicLayoutWrapper = () => {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

// Protected layout wrapper
const LayoutWrapper = () => {
  const { currentUser, adminPinValidated } = useContext(AppContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Force Admin PIN/biometrics verification check
  if (currentUser.role === 'admin' && !adminPinValidated) {
    return <Navigate to="/login" replace />;
  }

  // Restrict direct URL access to engineers panel
  const path = window.location.pathname;
  if (path.includes('/engineers') && currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className={`flex h-screen w-screen bg-bg-base text-text-base overflow-hidden font-sans select-none`}>
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header Navbar */}
        <Navbar />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-8 bg-bg-base">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const DashboardDispatcher = () => {
  const { currentUser, adminPinValidated } = useContext(AppContext);

  if (currentUser?.role === 'admin') {
    if (!adminPinValidated) {
      return <Navigate to="/login" replace />;
    }
    return <AdminDashboard />;
  } else if (currentUser?.role === 'engineer') {
    return <EngineerDashboard />;
  } else {
    return <CustomerDashboard />;
  }
};

// Main routing structure
function App() {
  const [isLoadingSplash, setIsLoadingSplash] = useState(() => {
    return sessionStorage.getItem('nexora_booted') !== 'true';
  });

  const handleBootComplete = () => {
    sessionStorage.setItem('nexora_booted', 'true');
    setIsLoadingSplash(false);
  };

  return (
    <AppProvider>
      <CustomCursor />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          {isLoadingSplash ? (
            <motion.div
              key="global-splash"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="fixed inset-0 z-50 bg-[#050816]"
            >
              <Splash onComplete={handleBootComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="global-app"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full h-full"
            >
              <Routes>
                {/* Public HUD Routes */}
                <Route element={<PublicLayoutWrapper />}>
                  <Route path="/" element={<Landing />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/ai-lab" element={<AILabPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/personnel" element={<PersonnelPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/faq" element={<FAQ />} />
                </Route>
                
                {/* Auth Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Core protected workspace routes */}
                <Route element={<LayoutWrapper />}>
                  <Route path="/dashboard" element={<DashboardDispatcher />} />
                  <Route path="/requests" element={<ServiceRequestList />} />
                  <Route path="/engineer-history" element={<EngineerReviewHistory />} />
                  <Route path="/request/:id" element={<RequestDetails />} />
                  <Route path="/engineers" element={<Engineers />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/ai-features" element={<AI />} />
                </Route>

                {/* Catch-all 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
