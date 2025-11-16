import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, X, Plus, ChevronsLeft, ChevronsRight } from 'lucide-react';
import SessionListItem from './SessionListItem';
import GradientButton from './ui/GradientButton';

const SessionSkeleton = () => (
  <div className="space-y-2 animate-pulse">
    <div className="h-4 bg-light-surface dark:bg-dark-surface rounded w-3/4"></div>
    <div className="h-4 bg-light-surface dark:bg-dark-surface rounded w-1/2"></div>
    <div className="h-4 bg-light-surface dark:bg-dark-surface rounded w-5/6"></div>
  </div>
);

const Sidebar = ({ isMobileOpen, setMobileOpen, isCollapsed, setCollapsed, sessions, isLoading, refreshSessions }) => {
  const navigate = useNavigate();

  const handleNewChat = () => {
    navigate('/');
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
  ];

  const sidebarContent = (
    <>
      <div className={`flex flex-col p-4 flex-1 overflow-y-auto duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img src="https://i.ibb.co/HLfD5wgf/dualite-favicon.png" alt="App Logo" className="h-8 w-8" />
            <span className="font-bold text-lg text-light-primary dark:text-dark-primary">AI Assistant</span>
          </div>
          <button onClick={() => setCollapsed(true)} className="hidden md:block p-1 rounded-md hover:bg-light-background dark:hover:bg-dark-background focus-visible:ring-2 focus-visible:ring-light-accent" aria-label="Collapse sidebar">
            <ChevronsLeft className="h-5 w-5 text-light-secondary dark:text-dark-secondary" />
          </button>
          <button onClick={() => setMobileOpen(false)} className="md:hidden p-1 rounded-md focus-visible:ring-2 focus-visible:ring-light-accent" aria-label="Close sidebar">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4">
          <GradientButton
            onClick={handleNewChat}
            width="100%"
            height="40px"
            className="text-sm font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </GradientButton>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-light-secondary dark:text-dark-secondary" />
          <input
            type="text"
            placeholder="Search chats"
            className="w-full bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-md pl-9 pr-3 py-1.5 text-sm focus:ring-1 focus:ring-light-accent dark:focus:ring-dark-accent focus:outline-none"
            aria-label="Search chats"
          />
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.path} end={item.path === '/'} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-light-accent ${isActive ? 'bg-light-surface dark:bg-dark-surface text-light-primary dark:text-dark-primary' : 'text-light-secondary dark:text-dark-secondary hover:bg-light-surface dark:hover:bg-dark-surface'}`}>
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 flex-1">
          <h3 className="px-3 text-xs font-semibold uppercase text-light-secondary dark:text-dark-secondary mb-2">Recent</h3>
          {isLoading ? (
            <div className="px-3">
              <SessionSkeleton />
            </div>
          ) : (
            <div className="space-y-1">
              {sessions.map((session) => (
                <SessionListItem key={session.id} session={session} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className={`p-4 border-t border-light-border dark:border-dark-border duration-300 ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/40" alt="User Avatar" className="h-8 w-8 rounded-full" />
            <div>
              <p className="text-sm font-semibold text-light-primary dark:text-dark-primary">User</p>
              <p className="text-xs text-light-secondary dark:text-dark-secondary">Free Plan</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const collapsedSidebarContent = (
    <div className={`flex flex-col items-center p-2 flex-1 overflow-y-auto duration-300 ${isCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button onClick={() => setCollapsed(false)} className="p-2 my-2 rounded-md hover:bg-light-surface dark:hover:bg-dark-surface focus-visible:ring-2 focus-visible:ring-light-accent" aria-label="Expand sidebar">
            <ChevronsRight className="h-5 w-5 text-light-secondary dark:text-dark-secondary" />
        </button>

        <button onClick={handleNewChat} className="p-2 my-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-light-accent dark:focus-visible:ring-dark-accent focus-visible:ring-offset-light-background dark:focus-visible:ring-offset-dark-background">
            <Plus className="h-5 w-5"/>
        </button>
        <nav className="space-y-2 mt-2">
            {navItems.map(item => (
                 <NavLink key={item.label} to={item.path} end={item.path === '/'} className={({ isActive }) => `p-2 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-light-accent ${isActive ? 'bg-light-surface dark:bg-dark-surface text-light-primary dark:text-dark-primary' : 'text-light-secondary dark:text-dark-secondary hover:bg-light-surface dark:hover:bg-dark-surface'}`}>
                    <item.icon className="h-5 w-5" />
                </NavLink>
            ))}
        </nav>
    </div>
  );


  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      ></div>
      
      <aside
        className={`fixed md:relative top-0 left-0 h-full bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border flex flex-col z-40 transition-all duration-300
          ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full'}
          md:translate-x-0 ${isCollapsed ? 'md:w-20' : 'md:w-64'}`
        }
      >
        <div className="flex-1 flex flex-col min-h-0">
          {isCollapsed ? collapsedSidebarContent : sidebarContent}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
