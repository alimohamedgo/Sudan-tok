
import React from 'react';

interface SidebarProps {
  onUploadClick: () => void;
  onAdminClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onUploadClick, onAdminClick }) => {
  return (
    <div className="hidden md:flex flex-col w-72 bg-white border-l border-slate-100 p-6 sticky top-0 h-screen overflow-y-auto shadow-sm">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-12 h-12 brand-gradient rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
          <img src="https://flagcdn.com/w80/sd.png" className="w-8 h-5 rounded-sm object-cover" alt="Sudan Flag" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-emerald-900 leading-tight">سودان توك</h1>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">منصتنا السودانية</span>
        </div>
      </div>

      <nav className="space-y-2">
        <SidebarItem icon="fa-house" label="الرئيسية" active />
        <SidebarItem icon="fa-users" label="المتابَعون" />
        <SidebarItem icon="fa-hashtag" label="الترند" />
        <SidebarItem icon="fa-video" label="بث مباشر" />
      </nav>

      <div className="mt-8 border-t border-slate-50 pt-8">
        <h3 className="text-[11px] font-black text-slate-400 mb-4 px-3 uppercase tracking-widest">إدارة</h3>
        <SidebarItem icon="fa-rectangle-ad" label="مركز الإعلانات" />
        <SidebarItem icon="fa-chart-simple" label="التحليلات" />
      </div>

      <div className="mt-auto space-y-4">
        <button 
          onClick={onUploadClick}
          className="w-full py-4 brand-gradient hover:opacity-90 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-50"
        >
          <i className="fa-solid fa-circle-plus text-xl"></i>
          نشر فيديو
        </button>
        
        <button 
          onClick={onAdminClick}
          className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-100"
        >
          <i className="fa-solid fa-user-shield text-sm"></i>
          لوحة الإدارة
        </button>
        
        <p className="text-[10px] text-slate-400 text-center pt-4">© 2025 Sudan Tok - صنع بكل حب في السودان 🇸🇩</p>
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{ icon: string; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 group ${active ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50 text-slate-500'}`}>
    <i className={`fa-solid ${icon} text-lg w-6 text-center ${active ? 'text-emerald-600' : 'text-slate-400'}`}></i>
    <span className="text-md font-bold">{label}</span>
  </div>
);

export default Sidebar;
