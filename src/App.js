const { useState } = React;
const { createRoot } = ReactDOM;
const { motion, AnimatePresence } = FramerMotion;

const App = () => {
  const [url, setUrl] = useState("");

  const handleNavigate = (e) => {
    e.preventDefault();
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    const wv = document.getElementById('browser-view');
    if (wv) {
      wv.src = targetUrl;
    }
    setUrl("");
  };

  return (
    <div className="flex h-screen w-full text-white font-sans bg-transparent overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-panel absolute left-0 top-0 w-[250px] h-full flex flex-col p-4 space-y-6 select-none z-50"
      >
        {/* macOS Window Controls */}
        <div className="flex items-center space-x-2 px-2 py-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
        </div>

        {/* Premium Search Bar */}
        <form onSubmit={handleNavigate} className="relative group">
          <div className="absolute left-3 top-3 text-white/30 group-focus-within:text-blue-400 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input
            type="text"
            placeholder="Search or go to..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs outline-none focus:ring-2 ring-blue-500/30 focus:bg-white/10 transition-all text-white/90 placeholder:text-white/20"
          />
        </form>

        {/* Navigation Sections */}
        <div className="flex-1 space-y-6">
          <div>
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-2 mb-3">Library</p>
            <nav className="space-y-1">
              <NavItem label="Spaces" active />
              <NavItem label="Profiles" />
              <NavItem label="Settings" />
            </nav>
          </div>
        </div>

        {/* Footer Badge */}
        <div className="p-3 bg-white/5 rounded-2xl text-center border border-white/5">
          <span className="text-[10px] font-medium text-white/40 tracking-tight uppercase">
            Modern Browser v1.0
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const NavItem = ({ label, active = false }) => (
  <motion.div
    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
    whileTap={{ scale: 0.98 }}
    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all group ${active ? 'bg-white/10 text-white shadow-sm' : 'text-white/60 hover:text-white'}`}
  >
    <div className="flex items-center space-x-3">
      <span className="text-xs font-medium transition-colors">{label}</span>
    </div>
    <div className="text-white/20 group-hover:text-white/50 transition-colors">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
    </div>
  </motion.div>
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);
