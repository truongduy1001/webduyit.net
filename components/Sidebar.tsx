
import React from 'react';
import { AppTool, Language } from '../types';
import { translations } from '../translations';

interface SidebarProps {
  activeTool: AppTool;
  lang: Language;
  onNavigate: (tool: AppTool) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, lang, onNavigate }) => {
  const t = translations[lang].sidebar;

  const menuItems = [
    { id: AppTool.HOME, label: t.dashboard, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: AppTool.TEXT, label: t.writer, icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: AppTool.IMAGE, label: t.visual, icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: AppTool.VIDEO, label: t.motion, icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { id: AppTool.VOICE, label: t.voice, icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
    { id: AppTool.PRODUCTS, label: t.products, icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-[#0a0f1d] border-r border-white/10 h-full flex flex-col transition-all duration-300">
      <div className="p-6 flex items-center justify-center lg:justify-start gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="text-white font-bold text-xl">D</span>
        </div>
        <span className="hidden lg:block text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          DUYIT.NET
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center justify-center lg:justify-start gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTool === item.id 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-100'
            }`}
          >
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span className="hidden lg:block font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <button
            onClick={() => onNavigate(AppTool.ADMIN)}
            className={`w-full flex items-center justify-center lg:justify-start gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTool === AppTool.ADMIN 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-100'
            }`}
          >
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden lg:block font-medium text-sm">{t.admin}</span>
          </button>

        <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 p-4 rounded-xl border border-white/5 hidden lg:block">
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">{t.proPlan}</p>
          <p className="text-sm text-gray-300 mb-3">{t.unlimited}</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors">
            {t.upgrade}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
