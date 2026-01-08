
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import VideoFeed from './components/VideoFeed';
import UploadModal from './components/UploadModal';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem('sudan_tok_admin');
    if (logged === 'true') setIsAdminLoggedIn(true);
  }, []);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setIsAdminLoginOpen(false);
    localStorage.setItem('sudan_tok_admin', 'true');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('sudan_tok_admin');
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-emerald-200">
      <Sidebar 
        onUploadClick={() => setIsUploadOpen(true)} 
        onAdminClick={() => setIsAdminLoginOpen(true)}
      />

      <main className="flex-1 relative overflow-hidden flex flex-col items-center">
        <div className="md:hidden absolute top-0 left-0 right-0 z-40 p-5 flex justify-between items-center bg-gradient-to-b from-white/90 to-transparent pointer-events-none">
          <div className="flex gap-6 pointer-events-auto">
            <span className="text-xl font-black border-b-4 border-emerald-600 text-emerald-900 pb-1">لك</span>
            <span className="text-xl font-black text-slate-400">أتابع</span>
          </div>
          <div className="flex gap-4 pointer-events-auto text-emerald-900">
             <i className="fa-solid fa-magnifying-glass text-xl"></i>
          </div>
        </div>

        <VideoFeed />

        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 px-8 py-4 flex justify-between items-center shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <NavItem icon="fa-house" label="الرئيسية" active />
          <NavItem icon="fa-compass" label="استكشف" />
          <div 
            className="w-14 h-12 brand-gradient rounded-2xl flex items-center justify-center cursor-pointer transform hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-100"
            onClick={() => setIsUploadOpen(true)}
          >
            <i className="fa-solid fa-plus text-white text-2xl"></i>
          </div>
          <NavItem icon="fa-message" label="الرسائل" />
          <div onClick={() => setIsAdminLoginOpen(true)}>
             <NavItem icon="fa-user-gear" label="الإدارة" />
          </div>
        </nav>
      </main>

      <div className="hidden lg:flex flex-col w-96 bg-slate-50 border-r border-slate-100 p-8 space-y-10 overflow-y-auto">
        <div className="bg-white rounded-2xl px-6 py-4 flex items-center gap-4 border border-slate-100 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-50 transition-all shadow-sm">
          <i className="fa-solid fa-magnifying-glass text-emerald-400"></i>
          <input 
            type="text" 
            placeholder="البحث عن مبدعين..."
            className="bg-transparent outline-none flex-1 text-sm text-slate-700 font-bold"
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">حسابات موصى بها</h3>
          <SuggestedUser name="منال المهدي" handle="manal_sd" avatar="https://picsum.photos/seed/manal/100/100" />
          <SuggestedUser name="فيصل عبد العزيز" handle="faisal_vlog" avatar="https://picsum.photos/seed/faisal/100/100" />
          <button className="text-emerald-600 text-xs font-black hover:underline pr-2">اكتشف المزيد</button>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">هاشتاقات متصدرة</h3>
          <div className="flex flex-wrap gap-2">
            <Tag label="السودان_بخير" />
            <Tag label="إبداع_سوداني" />
            <Tag label="SudanTok" />
            <Tag label="الخرطوم_الان" />
          </div>
        </div>
      </div>

      {isUploadOpen && <UploadModal onClose={() => setIsUploadOpen(false)} />}
      {isAdminLoginOpen && (
        <AdminLogin 
          onLogin={handleAdminLogin} 
          onCancel={() => setIsAdminLoginOpen(false)} 
        />
      )}
      {isAdminLoggedIn && (
        <AdminDashboard onLogout={handleAdminLogout} />
      )}
    </div>
  );
};

const NavItem: React.FC<{ icon: string; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-emerald-600' : 'text-slate-300'}`}>
    <i className={`fa-solid ${icon} text-2xl`}></i>
    <span className="text-[10px] font-black">{label}</span>
  </div>
);

const SuggestedUser: React.FC<{ name: string; handle: string; avatar: string }> = ({ name, handle, avatar }) => (
  <div className="flex items-center justify-between hover:bg-white p-3 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-slate-100 shadow-sm shadow-transparent hover:shadow-emerald-50">
    <div className="flex items-center gap-4">
      <img src={avatar} className="w-10 h-10 rounded-xl border border-emerald-100" alt={handle} />
      <div className="leading-tight">
        <p className="text-sm font-black text-slate-800">@{handle}</p>
        <p className="text-[10px] text-slate-400 font-bold">{name}</p>
      </div>
    </div>
    <button className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-xl text-[10px] font-black hover:bg-emerald-600 hover:text-white transition-all">متابعة</button>
  </div>
);

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <div className="px-4 py-2 border border-slate-100 bg-white rounded-xl text-xs text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 cursor-pointer transition-all flex items-center gap-2 font-bold shadow-sm">
    <i className="fa-solid fa-hashtag text-[10px] text-emerald-500"></i>
    {label}
  </div>
);

export default App;
