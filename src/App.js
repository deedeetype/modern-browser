const { useState } = React;
const { createRoot } = ReactDOM;
const { motion } = FramerMotion;

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
    <div className="flex h-screen w-full text-white font-sans bg-zinc-900 overflow-hidden">
      <div className="w-[250px] h-full bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col p-4 space-y-6 select-none z-10 relative">
        <div className="flex items-center space-x-2 px-2 py-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <form onSubmit={handleNavigate} className="relative group">
          <div className="absolute left-3 top-2.5 text-white/50 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input
            type="text"
            placeholder="Search or go to..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white/10 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 ring-blue-500/50 transition-all text-white"
          />
        </form>

        <nav className="flex-1 space-y-1">
          <NavItem label="Spaces" />
          <NavItem label="Profiles" />
          <NavItem label="Settings" />
        </nav>
        <div className="p-2 bg-white/5 rounded-xl text-xs text-white/40 text-center">
          Modern Browser v1.0
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ label }) => (
  <div className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors group">
    <div className="flex items-center space-x-3">
      <span className="text-white/60 group-hover:text-white transition-colors text-sm">{label}</span>
    </div>
    <div className="text-white/20">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
    </div>
  </div>
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);
