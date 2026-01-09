
import React, { useState, useEffect } from 'react';
import { ExternalProduct, Language } from '../types';
import { translations } from '../translations';

interface AdminToolProps {
  lang: Language;
  onColorChange: (color: string) => void;
  currentTheme: string;
}

const AdminTool: React.FC<AdminToolProps> = ({ lang, onColorChange, currentTheme }) => {
  const t = translations[lang].admin;
  const [products, setProducts] = useState<ExternalProduct[]>([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');

  const themeOptions = [
    { name: 'Blue', color: '#2563eb' },
    { name: 'Indigo', color: '#4f46e5' },
    { name: 'Purple', color: '#9333ea' },
    { name: 'Rose', color: '#e11d48' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Cyan', color: '#0891b2' },
    { name: 'Orange', color: '#ea580c' },
    { name: 'Gold', color: '#d97706' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('duyit_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    if (!name || !url) return;
    
    const newProduct: ExternalProduct = {
      id: Date.now().toString(),
      name,
      url: url.startsWith('http') ? url : `https://${url}`,
      description: desc
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem('duyit_products', JSON.stringify(updated));
    
    // Reset form
    setName('');
    setUrl('');
    setDesc('');
    alert(t.success);
  };

  const handleDelete = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('duyit_products', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Theme Settings Card */}
      <div className="glass-panel p-8 rounded-3xl space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white">{t.themeTitle}</h3>
          <p className="text-sm text-gray-400 mt-1">{t.themeSub}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {themeOptions.map((opt) => (
            <button
              key={opt.color}
              onClick={() => onColorChange(opt.color)}
              className={`w-12 h-12 rounded-2xl transition-all duration-300 flex items-center justify-center border-2 ${
                currentTheme === opt.color 
                  ? 'border-white scale-110 shadow-lg' 
                  : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
              }`}
              style={{ backgroundColor: opt.color }}
              title={opt.name}
            >
              {currentTheme === opt.color && (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
          <div className="flex items-center gap-3 ml-2 border-l border-white/10 pl-6">
             <input 
              type="color" 
              value={currentTheme}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-12 h-12 bg-transparent border-none cursor-pointer rounded-2xl overflow-hidden"
             />
             <span className="text-xs font-mono text-gray-500 uppercase">{currentTheme}</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl space-y-6">
        <h3 className="text-xl font-bold text-white mb-4">{t.addBtn}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.nameLabel}</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none"
              placeholder="e.g. ChatGPT Pro"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.urlLabel}</label>
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none"
              placeholder="chat.openai.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.descLabel}</label>
          <textarea 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/50 outline-none min-h-[80px]"
            placeholder="Describe what this tool does..."
          />
        </div>

        <button 
          onClick={handleSave}
          disabled={!name || !url}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20"
        >
          {t.save}
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white px-2">{t.title}</h3>
        <div className="space-y-3">
          {products.length > 0 ? products.map((p) => (
            <div key={p.id} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/[0.07] transition-all">
              <div>
                <h4 className="font-bold text-gray-100">{p.name}</h4>
                <p className="text-xs text-gray-500 truncate max-w-xs">{p.url}</p>
              </div>
              <button 
                onClick={() => handleDelete(p.id)}
                className="text-red-400 hover:text-red-300 text-xs font-bold px-4 py-2 hover:bg-red-400/10 rounded-lg transition-all"
              >
                {t.delete}
              </button>
            </div>
          )) : (
            <div className="text-center py-10 text-gray-600 text-sm italic">
               No products added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTool;
