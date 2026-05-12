import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { Search, LayoutGrid, Settings, User, ChevronRight } from 'lucide-react';

// REMPLACÉ: ipcRenderer par un mock pour le preview navigateur
const mockIpc = {
  send: (channel, data) => console.log(`[IPC Mock] ${channel}:`, data)
};

const App = () => {
  const [url, setUrl] = useState('');

  const navigate = (e) => {
    e.preventDefault();
    mockIpc.send('navigate', url);
    alert('Navigation vers: ' + url + ' (Fonctionnel dans l\'app Electron native)');
    setUrl('');
  };

  return (
    <div className="flex h-screen w-full text-white font-sans bg-zinc-900 overflow-hidden">
      {/* Sidebar Glassmorphism */}
      <motion.div 
        initial={{ x: -300 }} 
        animate={{ x: 0 }} 
        className="w-[250px] h-full bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col p-4 space-y-6 select-none"
      >
        <div className="flex items-center space-x-2 px-2 py-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <form onSubmit={navigate} className="relative group">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/50 group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Search or go to..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 ring-blue-500/50 transition-all text-white"
          />
        </form>

        <nav className="flex-1 space-y-1">
          <NavItem icon={<LayoutGrid size={18}/>} label="Spaces" />
          <NavItem icon={<User size={18}/>} label="Profiles" />
          <NavItem icon={<Settings size={18}/>} label="Settings" />
        </nav>

        <div className="p-2 bg-white/5 rounded-xl text-xs text-white/40 text-center">
          Modern Browser Preview v1.0
        </div>
      </motion.div>
      
      <div className="flex-1 flex items-center justify-center text-white/20">
        <p>Web Content (BrowserView) will appear here in the native app</p>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label }) => (
  <motion.div 
    whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.1)' }}
    className="flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors group"
  >
    <div className="flex items-center space-x-3">
      <span className="text-white/60 group-hover:text-white transition-colors">{icon}</span>
      <span className="text-sm text-white/80 group-hover:text-white transition-colors">{label}</span>
    </div>
    <ChevronRight size={14} className="text-white/20" />
  </motion.div>
);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
