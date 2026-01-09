
import React, { useState } from 'react';

const VideoTool: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [needsKey, setNeedsKey] = useState(false);

  // Mock implementation for Veo interaction since it requires user key selection
  const handleStart = async () => {
    // Check if user has selected key as per rules
    const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
    if (!hasKey) {
        setNeedsKey(true);
        return;
    }
    
    setIsGenerating(true);
    // Simulation
    setTimeout(() => {
        setIsGenerating(false);
        alert("This demo is restricted. Integration with Veo requires a persistent backend for polling long-running operations.");
    }, 2000);
  };

  const openKeyPicker = async () => {
    await (window as any).aistudio?.openSelectKey();
    setNeedsKey(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 rounded-3xl border border-white/10 space-y-8">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-600 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </div>
            <div>
                <h2 className="text-2xl font-bold">Veo 3.1 Synthesis</h2>
                <p className="text-gray-400">Next-generation cinematic video generation from text.</p>
            </div>
        </div>

        {needsKey ? (
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl space-y-4">
                <p className="text-yellow-400 font-medium">Video generation requires a Paid API Key selection.</p>
                <p className="text-sm text-gray-400">As per Gemini safety guidelines, Veo models require explicit billing confirmation. Follow the link to <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">billing documentation</a>.</p>
                <button 
                    onClick={openKeyPicker}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-xl font-bold transition-colors"
                >
                    Select API Key
                </button>
            </div>
        ) : (
            <div className="space-y-6">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the cinematic scene (e.g., 'A neon hologram of a cybernetic cat driving through a futuristic Tokyo rain...')"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[150px]"
                />
                
                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-gray-300">
                            <option>1080p</option>
                            <option>720p</option>
                        </select>
                        <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-gray-300">
                            <option>16:9 Landscape</option>
                            <option>9:16 Portrait</option>
                        </select>
                    </div>

                    <button
                        onClick={handleStart}
                        disabled={isGenerating || !prompt.trim()}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-2xl font-bold transition-all disabled:opacity-50"
                    >
                        {isGenerating ? 'Synthesizing...' : 'Generate Video'}
                    </button>
                </div>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50 grayscale">
         <div className="aspect-video bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center">
            <span className="text-gray-600 font-bold uppercase tracking-widest text-xs">Sample Render #1</span>
         </div>
         <div className="aspect-video bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center">
            <span className="text-gray-600 font-bold uppercase tracking-widest text-xs">Sample Render #2</span>
         </div>
      </div>
    </div>
  );
};

export default VideoTool;
