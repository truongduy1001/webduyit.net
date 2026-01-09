
import React, { useState, useEffect } from 'react';
import { AppTool, Language } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './components/Home';
import TextTool from './components/TextTool';
import ImageTool from './components/ImageTool';
import VideoTool from './components/VideoTool';
import VoiceTool from './components/VoiceTool';
import ProductsTool from './components/ProductsTool';
import AdminTool from './components/AdminTool';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<AppTool>(AppTool.HOME);
  const [lang, setLang] = useState<Language>('vi');
  const [themeColor, setThemeColor] = useState<string>(() => {
    return localStorage.getItem('duyit_theme_color') || '#2563eb';
  });

  // Sync hash for basic navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppTool;
      if (Object.values(AppTool).includes(hash)) {
        setActiveTool(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update theme color globally
  useEffect(() => {
    const styleId = 'dynamic-theme-style';
    let styleElement = document.getElementById(styleId);
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Helper to generate a transparent version of the color for glows
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const glowColor = hexToRgba(themeColor, 0.2);
    const intenseGlow = hexToRgba(themeColor, 0.4);

    styleElement.innerHTML = `
      :root {
        --primary-color: ${themeColor};
        --primary-glow: ${glowColor};
        --primary-intense: ${intenseGlow};
      }
      /* Override Tailwind utility classes to respect theme */
      .bg-blue-600 { background-color: var(--primary-color) !important; }
      .hover\\:bg-blue-700:hover { filter: brightness(0.9); }
      .text-blue-400 { color: var(--primary-color) !important; }
      .text-blue-600 { color: var(--primary-color) !important; }
      .border-blue-500 { border-color: var(--primary-color) !important; }
      .border-blue-600 { border-color: var(--primary-color) !important; }
      .from-blue-600 { --tw-gradient-from: var(--primary-color) !important; }
      .to-blue-600 { --tw-gradient-to: var(--primary-color) !important; }
      .shadow-blue-600\\/20 { box-shadow: 0 10px 15px -3px var(--primary-glow) !important; }
      .shadow-blue-500\\/20 { box-shadow: 0 10px 15px -3px var(--primary-glow) !important; }
      .bg-blue-600\\/10 { background-color: var(--primary-glow) !important; }
      .bg-blue-600\\/20 { background-color: var(--primary-intense) !important; }
      .focus\\:ring-blue-500\\/50:focus { --tw-ring-color: var(--primary-intense) !important; }
    `;
    
    localStorage.setItem('duyit_theme_color', themeColor);
  }, [themeColor]);

  const renderActiveTool = () => {
    switch (activeTool) {
      case AppTool.TEXT: return <TextTool lang={lang} />;
      case AppTool.IMAGE: return <ImageTool lang={lang} />;
      case AppTool.VIDEO: return <VideoTool lang={lang} />;
      case AppTool.VOICE: return <VoiceTool lang={lang} />;
      case AppTool.PRODUCTS: return <ProductsTool lang={lang} />;
      case AppTool.ADMIN: return <AdminTool lang={lang} onColorChange={setThemeColor} currentTheme={themeColor} />;
      default: return <Home lang={lang} onSelectTool={(tool) => {
          setActiveTool(tool);
          window.location.hash = tool;
      }} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTool={activeTool} lang={lang} onNavigate={(tool) => {
          setActiveTool(tool);
          window.location.hash = tool;
      }} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header activeTool={activeTool} lang={lang} onLangChange={setLang} />
        <main className="flex-1 overflow-y-auto bg-[#030712] p-4 lg:p-8">
          {renderActiveTool()}
        </main>
      </div>
    </div>
  );
};

export default App;
