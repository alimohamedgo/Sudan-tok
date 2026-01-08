
import React, { useState } from 'react';
import { MOCK_VIDEOS } from '../constants';
import { AdminTab } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  return (
    <div className="fixed inset-0 z-[500] bg-[#f8fafc] flex h-full overflow-hidden text-right" dir="rtl">
      {/* Sidebar الإدارة العصري */}
      <aside className="w-80 bg-white border-l border-slate-100 flex flex-col shadow-xl">
        <div className="p-8 border-b border-slate-50 flex items-center gap-4">
          <div className="w-12 h-12 brand-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
             <img src="https://flagcdn.com/w80/sd.png" className="w-7 h-4 rounded-sm" alt="SD" />
          </div>
          <div>
            <h2 className="text-xl font-black text-emerald-900 leading-tight">سودان توك</h2>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">نظام الإدارة الشامل</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          <NavBtn icon="fa-grid-2" label="لوحة الإحصائيات" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavBtn icon="fa-layer-group" label="إدارة المحتوى" active={activeTab === 'content'} onClick={() => setActiveTab('content')} />
          <NavBtn icon="fa-bullhorn" label="الحملات الإعلانية" active={activeTab === 'advertising'} onClick={() => setActiveTab('advertising')} />
          
          <div className="pt-6 mt-6 border-t border-slate-100">
            <h3 className="text-[10px] font-black text-slate-400 mb-4 pr-4 uppercase tracking-widest">تطوير</h3>
            <NavBtn icon="fa-android" label="تطبيق الموبايل APK" active={activeTab === 'mobile-app'} onClick={() => setActiveTab('mobile-app')} color="text-emerald-600" />
          </div>
        </nav>

        <div className="p-8">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 p-4 text-red-500 font-black rounded-2xl hover:bg-red-50 transition-all border border-red-50 shadow-sm"
          >
            <i className="fa-solid fa-power-off"></i>
            إنهاء الجلسة
          </button>
        </div>
      </aside>

      {/* المحتوى الرئيسي النظيف */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <h1 className="text-2xl font-black text-slate-800">
               {activeTab === 'overview' && 'إحصائيات المنصة'}
               {activeTab === 'content' && 'المحتوى المتداول'}
               {activeTab === 'advertising' && 'العوائد والإعلانات'}
               {activeTab === 'mobile-app' && 'بناء حزمة APK'}
             </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 p-2 pr-6 rounded-2xl border border-slate-100 shadow-sm">
             <div className="text-left">
                <p className="text-xs font-black text-slate-800 leading-tight">علي محمد</p>
                <p className="text-[10px] text-emerald-600 font-bold">المدير التنفيذي</p>
             </div>
             <img src="https://picsum.photos/seed/admin/100/100" className="w-12 h-12 rounded-xl border-2 border-white shadow-sm" alt="admin" />
          </div>
        </header>

        <div className="flex-1 p-10 overflow-y-auto hide-scrollbar">
          {activeTab === 'overview' && <OverviewGrid />}
          {activeTab === 'content' && <ContentManager />}
          {activeTab === 'mobile-app' && <APKSection />}
        </div>
      </main>
    </div>
  );
};

const NavBtn = ({ icon, label, active, onClick, color }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-5 p-5 rounded-2xl transition-all font-black text-sm ${active ? 'brand-gradient text-white shadow-xl shadow-emerald-100 scale-[1.02]' : `text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 ${color || ''}`}`}
  >
    <i className={`fa-solid ${icon} text-xl w-6`}></i>
    {label}
  </button>
);

const OverviewGrid = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatBox label="إجمالي المشاهدات" value="1.5M" trend="+12%" icon="fa-eye" />
      <StatBox label="مبدعو المحتوى" value="8,420" trend="+5%" icon="fa-user-astronaut" />
      <StatBox label="معدل التفاعل" value="92%" trend="+3%" icon="fa-bolt" />
      <StatBox label="صافي الأرباح" value="$3,240" trend="+8%" icon="fa-sack-dollar" />
    </div>

    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-10">
         <h3 className="text-xl font-black text-slate-800">تحليلات النمو الأسبوعي</h3>
         <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold text-slate-400 uppercase">مستخدمون نشطون</span>
         </div>
      </div>
      <div className="h-64 flex items-end justify-between gap-6">
        {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
          <div key={i} className="flex-1 relative group">
            <div 
              className="w-full brand-gradient rounded-2xl transition-all duration-1000 group-hover:opacity-80" 
              style={{ height: `${h}%` }}
            ></div>
            <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-400">0{i+1}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StatBox = ({ label, value, trend, icon }: any) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-6">
      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
        <i className={`fa-solid ${icon} text-2xl`}></i>
      </div>
      <span className="text-[11px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">{trend}</span>
    </div>
    <h4 className="text-slate-400 text-xs font-black mb-1 uppercase tracking-tighter">{label}</h4>
    <p className="text-3xl font-black text-slate-800 tracking-tighter">{value}</p>
  </div>
);

const ContentManager = () => (
  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
      <h3 className="text-xl font-black text-slate-800">مراجعة المحتوى اليومي</h3>
      <button className="brand-gradient text-white px-8 py-3 rounded-2xl text-xs font-black shadow-lg shadow-emerald-50">تصدير التقارير</button>
    </div>
    <table className="w-full text-right">
      <thead className="bg-slate-50 text-[10px] text-slate-400 font-black uppercase tracking-widest">
        <tr>
          <th className="p-8">المقطع المرئي</th>
          <th className="p-8">صاحب الحساب</th>
          <th className="p-8 text-center">التفاعلات</th>
          <th className="p-8 text-center">الإجراء</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {MOCK_VIDEOS.map(v => (
          <tr key={v.id} className="hover:bg-slate-50/50 transition-all">
            <td className="p-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-20 bg-slate-200 rounded-2xl overflow-hidden shadow-md">
                  <video src={v.url} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800 line-clamp-1">{v.description}</p>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1">#Sudan_Tok_Exclusive</p>
                </div>
              </div>
            </td>
            <td className="p-8 font-black text-slate-600 text-sm">@{v.user.handle}</td>
            <td className="p-8 text-center">
               <span className="text-sm font-black text-emerald-700">{v.likes.toLocaleString()}</span>
            </td>
            <td className="p-8 text-center">
               <button className="w-12 h-12 rounded-2xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"><i className="fa-solid fa-trash-can"></i></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const APKSection = () => (
  <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
    <div className="bg-white p-12 rounded-[3rem] border border-emerald-100 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 brand-gradient opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center shadow-inner">
           <i className="fa-brands fa-android text-5xl"></i>
        </div>
        <div className="flex-1 text-center md:text-right">
          <h2 className="text-3xl font-black text-emerald-900 mb-2">نسخة الأندرويد الاحترافية</h2>
          <p className="text-slate-500 font-bold">حول منصة سودان توك إلى تطبيق هاتف APK متكامل بضغطة زر</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
         <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <h4 className="font-black text-emerald-800 mb-4 flex items-center gap-3">
               <i className="fa-solid fa-gear"></i>
               إعدادات الحزمة
            </h4>
            <ul className="space-y-3 text-sm font-bold text-slate-600">
               <li className="flex justify-between"><span>اسم الحزمة:</span> <code className="text-emerald-600">com.sudantok.app</code></li>
               <li className="flex justify-between"><span>الإصدار:</span> <code className="text-emerald-600">v2.4.0-gold</code></li>
               <li className="flex justify-between"><span>حجم الملف المتوقع:</span> <code className="text-emerald-600">18.4 MB</code></li>
            </ul>
         </div>
         <div className="flex flex-col justify-center">
            <button className="w-full py-6 brand-gradient text-white font-black rounded-3xl text-xl shadow-2xl shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 mb-4">
               <i className="fa-solid fa-cloud-arrow-down"></i>
               تحميل ملف الـ APK الآن
            </button>
            <p className="text-[10px] text-center text-slate-400 font-bold">تم توقيع التطبيق بشهادة أمان سودان توك الموثقة</p>
         </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
