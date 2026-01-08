
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'aalimohamed37@gmail.com' && password === 'aalimohamed37@gmail.com') {
      onLogin();
    } else {
      setError('بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى');
    }
  };

  return (
    <div className="fixed inset-0 z-[600] bg-emerald-950/40 backdrop-blur-xl flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="p-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 brand-gradient rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-200 mb-6">
               <img src="https://flagcdn.com/w160/sd.png" className="w-12 h-8 rounded-sm object-cover" alt="Flag" />
            </div>
            <h2 className="text-3xl font-black text-emerald-950 mb-2">إدارة سودان توك</h2>
            <p className="text-slate-400 font-bold text-sm">منصة المبدعين في السودان 🇸🇩</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-emerald-900 mr-2 uppercase tracking-widest">البريد الإداري</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sudantok.sd"
                className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all bg-slate-50 text-slate-800 font-bold"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-emerald-900 mr-2 uppercase tracking-widest">كلمة السر</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all bg-slate-50 text-slate-800 font-bold"
                required
              />
            </div>
            
            {error && <p className="text-red-500 text-xs font-black text-center animate-bounce">{error}</p>}

            <button 
              type="submit"
              className="w-full py-5 brand-gradient hover:opacity-90 text-white font-black rounded-2xl transition-all shadow-2xl shadow-emerald-100 mt-6 text-lg"
            >
              دخول النظام
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="w-full py-3 text-slate-400 font-bold hover:text-emerald-600 transition-colors"
            >
              العودة للمنصة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
