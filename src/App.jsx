import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import ChatPage from './pages/ChatPage';
import { Menu } from 'lucide-react';
import { getSessions } from './api';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const location = useLocation();

  const refreshSessions = () => {
    setSessionsLoading(true);
    // TODO: replace stub with real axios/fetch call to /api/sessions
    getSessions().then(response => {
      if (response.success) {
        setSessions(response.sessions);
      }
    }).finally(() => {
      setSessionsLoading(false);
    });
  };

  useEffect(() => {
    refreshSessions();
  }, []);
  
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const Layout = () => (
    <div className="flex h-screen w-full bg-light-background dark:bg-dark-background overflow-hidden">
      <Sidebar 
        isMobileOpen={sidebarOpen} 
        setMobileOpen={setSidebarOpen} 
        isCollapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        sessions={sessions}
        isLoading={sessionsLoading}
        refreshSessions={refreshSessions}
      />
      <main className="flex-1 flex flex-col transition-all duration-300 relative">
        {/* Mobile Header (all pages) */}
        <div className="md:hidden flex items-center justify-between p-2 h-14 border-b border-light-border dark:border-dark-border sticky top-0 bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-xl z-20">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open sidebar" className="p-2 rounded-md focus-visible:ring-2 focus-visible:ring-light-accent">
            <Menu className="h-6 w-6 text-light-secondary dark:text-dark-secondary" />
          </button>
          <span className="font-semibold text-light-primary dark:text-dark-primary">AI Assistant</span>
          <ThemeToggle />
        </div>

        {/* Desktop Header for Landing Page ONLY */}
        {location.pathname === '/' && (
          <div className="hidden md:flex absolute top-4 right-6 z-30">
            <ThemeToggle />
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <Outlet context={{ refreshSessions }} />
        </div>
      </main>
    </div>
  );

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/session/:sessionId" element={<ChatPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
