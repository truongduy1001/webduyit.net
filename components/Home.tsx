
import React from 'react';
import { AppTool, Language } from '../types';
import { translations } from '../translations';

interface HomeProps {
  onSelectTool: (tool: AppTool) => void;
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ onSelectTool, lang }) => {
  const t = translations[lang].home;
  const s = translations[lang].sidebar;

  const features = [
    {
      id: AppTool.TEXT,
      title: s.writer,
      description: lang === 'en' ? 'Generate essays, code, marketing copy and more using Gemini 3 Pro.' : 'Tạo bài luận, mã nguồn, nội dung marketing và nhiều hơn nữa với Gemini 3 Pro.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'bg-blue-600',
      tag: lang === 'en' ? 'Most Popular' : 'Phổ biến nhất'
    },
    {
      id: AppTool.IMAGE,
      title: s.visual,
      description: lang === 'en' ? 'Transform descriptions into high-quality realistic images.' : 'Biến mô tả thành những hình ảnh thực tế chất lượng cao.',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'bg-indigo-600',
      tag: lang === 'en' ? 'New' : 'Mới'
    },
    {
      id: AppTool.VIDEO,
      title: s.motion,
      description: lang === 'en' ? 'Create cinematic AI videos from text prompts with Veo 3.1.' : 'Tạo video AI điện ảnh từ văn bản với Veo 3.1.',
      icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      color: 'bg-purple-600',
      tag: lang === 'en' ? 'Experimental' : 'Thử nghiệm'
    },
    {
      id: AppTool.VOICE,
      title: s.voice,
      description: lang === 'en' ? 'Ultra-realistic text-to-speech engine for narrations.' : 'Công cụ chuyển văn bản thành giọng nói siêu thực cho thuyết minh.',
      icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
      color: 'bg-pink-600',
      tag: 'Pro'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4 pt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          {t.heroTitle1} <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {t.heroTitle2}
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {t.heroSub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            onClick={() => onSelectTool(feature.id)}
            className="group relative p-8 bg-[#0a0f1d] border border-white/5 rounded-3xl hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className={`absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity`}>
              <span className="bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                {t.launch}
              </span>
            </div>

            <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
              </svg>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold text-gray-100">{feature.title}</h3>
              <span className="text-[10px] font-bold bg-white/5 text-gray-400 border border-white/10 px-2 py-0.5 rounded uppercase tracking-wide">
                {feature.tag}
              </span>
            </div>
            
            <p className="text-gray-400 leading-relaxed mb-8">
              {feature.description}
            </p>

            <button className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all">
              {t.launch}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center space-y-6">
        <h2 className="text-2xl font-bold">{t.customTitle}</h2>
        <p className="text-gray-400">{t.customSub}</p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
            {t.contact}
          </button>
          <button className="bg-white/5 border border-white/10 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
            {t.docs}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
