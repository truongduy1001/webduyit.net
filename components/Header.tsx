
import React from 'react';
import { AppTool, Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  activeTool: AppTool;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTool, lang, onLangChange }) => {
  const t = translations[lang].header;
  
  const getToolTitle = () => {
    switch (activeTool) {
      case AppTool.TEXT: return t.titles.text;
      case AppTool.IMAGE: return t.titles.image;
      case AppTool.VIDEO: return t.titles.video;
      case AppTool.VOICE: return t.titles.voice;
      default: return t.titles.home;
    }
  };

  return (
    <header className="h-20 border-b border-white/5 bg-[#030712]/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
      <div>
        <h1 className="text-xl font-semibold text-gray-100">{getToolTitle()}</h1>
        <p className="text-sm text-gray-500 hidden sm:block">{t.subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="flex bg-white/5 border border-white/10 rounded-full p-1 gap-1">
          <button 
            onClick={() => onLangChange('en')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            EN
          </button>
          <button 
            onClick={() => onLangChange('vi')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'vi' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            VN
          </button>
        </div>

        <div className="hidden md:flex bg-white/5 border border-white/10 rounded-full px-4 py-1.5 items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-400">{t.status}</span>
        </div>
        
        <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 border-2 border-white/10 cursor-pointer overflow-hidden flex items-center justify-center">
            <span className="text-white text-xs font-bold">JD</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
