
import React, { useState } from 'react';
import { generateVideoCaption, suggestTrendingHashtags } from '../services/geminiService';

interface UploadModalProps {
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  const [topic, setTopic] = useState('');
  const [captions, setCaptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trending, setTrending] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsLoading(true);
    const results = await generateVideoCaption(topic);
    const hashtags = await suggestTrendingHashtags();
    setCaptions(results);
    setTrending(hashtags);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center bg-emerald-900/20 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl border border-emerald-50 animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-emerald-50 flex justify-between items-center bg-emerald-50/30">
          <div className="flex items-center gap-3">
             <i className="fa-solid fa-cloud-arrow-up text-emerald-600"></i>
             <h2 className="text-xl font-black text-emerald-900">نشر محتوى جديد</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-emerald-600 transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="border-2 border-dashed border-emerald-100 rounded-2xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer bg-emerald-50/30 group">
            <i className="fa-solid fa-video text-4xl text-emerald-200 mb-3 group-hover:scale-110 transition-transform"></i>
            <p className="text-emerald-900 font-black">اسحب الفيديو هنا</p>
            <p className="text-emerald-600/60 text-xs font-bold mt-1">MP4, WebM بمساحة لا تزيد عن 50MB</p>
            <input type="file" className="hidden" />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-emerald-800 uppercase tracking-widest mr-2">وصف الفيديو (ذكاء اصطناعي)</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="عن ماذا يتحدث مقطعك؟"
                className="flex-1 bg-emerald-50/50 border border-emerald-100 rounded-xl px-5 py-3 outline-none focus:border-emerald-500 text-slate-700 font-bold shadow-sm"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <button 
                onClick={handleGenerate}
                disabled={isLoading || !topic}
                className="brand-gradient disabled:bg-slate-200 disabled:text-slate-400 text-white px-5 py-3 rounded-xl font-black transition-all flex items-center gap-2 shadow-lg shadow-emerald-100"
              >
                {isLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
              </button>
            </div>
          </div>

          {captions.length > 0 && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest">اقتراحات سودان توك:</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto hide-scrollbar">
                {captions.map((cap, idx) => (
                  <div 
                    key={idx} 
                    className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-50 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-all text-sm font-bold text-slate-700"
                    onClick={() => setTopic(cap)}
                  >
                    {cap}
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {trending.map((tag, idx) => (
                  <span key={idx} className="bg-emerald-100/50 text-emerald-700 px-3 py-1.5 rounded-lg text-[10px] font-black">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-8 bg-emerald-50/30 flex gap-4">
          <button className="flex-1 py-4 brand-gradient text-white rounded-2xl font-black transition-all shadow-xl shadow-emerald-100">
            نشر المقطع
          </button>
          <button onClick={onClose} className="flex-1 py-4 bg-white border border-emerald-100 text-slate-400 hover:text-red-500 rounded-2xl font-black transition-all">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
