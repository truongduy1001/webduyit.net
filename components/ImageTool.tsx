
import React, { useState } from 'react';
import { generateImage } from '../services/gemini';
import { GeneratedImage, Language } from '../types';
import { translations } from '../translations';

interface ImageToolProps {
  lang: Language;
}

const ImageTool: React.FC<ImageToolProps> = ({ lang }) => {
  const t = translations[lang].imageTool;
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "9:16">("1:1");
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const url = await generateImage(prompt, aspectRatio);
      if (url) {
        const newImg: GeneratedImage = {
          id: Date.now().toString(),
          url,
          prompt,
          timestamp: Date.now()
        };
        setImages(prev => [newImg, ...prev]);
        setPrompt('');
      }
    } catch (err) {
      console.error(err);
      alert(lang === 'en' ? 'Failed to generate image.' : 'Không thể tạo hình ảnh.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="glass-panel p-8 rounded-3xl space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{t.prompt}</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[100px] resize-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider">{t.ratio}</label>
            <div className="flex gap-2">
              {(["1:1", "16:9", "9:16"] as const).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    aspectRatio === ratio 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 flex items-center gap-3"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {t.generating}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {t.generate}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all">
            <img src={img.url} alt={img.prompt} className="w-full aspect-square object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
              <p className="text-sm text-gray-100 line-clamp-3 mb-4">{img.prompt}</p>
              <div className="flex gap-2">
                <a 
                  href={img.url} 
                  download={`DUYIT-${img.id}.png`}
                  className="flex-1 bg-white text-black text-center py-2 rounded-lg text-xs font-bold hover:bg-gray-200"
                >
                  {lang === 'en' ? 'Download' : 'Tải xuống'}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {images.length === 0 && !isGenerating && (
        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
          </div>
          <p className="text-gray-500">{t.noImages}</p>
        </div>
      )}
    </div>
  );
};

export default ImageTool;
