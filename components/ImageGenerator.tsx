import React, { useState } from 'react';
import { generateHistoricalImage } from '../services/gemini';
import { ImageSize } from '../types';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>(ImageSize.Size1K);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImageUrl(null);
    try {
        const url = await generateHistoricalImage(prompt, size);
        setImageUrl(url);
    } catch (e: any) {
        setError("Failed to generate image. Ensure you selected a valid API key with billing enabled if using Pro models.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl mb-8">
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-500/20 rounded-lg text-pink-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Visual History Generator</h2>
                    <p className="text-sm text-slate-400">Reimagine history with Gemini 3 Pro Image (Nano Banana Pro)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Prompt</label>
                        <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe a historical scene (e.g., 'A futuristic 1960s city on Mars')"
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-pink-500 focus:outline-none min-h-[120px]"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Resolution</label>
                        <div className="flex bg-slate-950/50 p-1 rounded-lg border border-slate-700">
                            {Object.values(ImageSize).map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={`flex-1 py-1 text-xs font-medium rounded-md transition-all ${size === s ? 'bg-pink-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading || !prompt}
                        className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg shadow-purple-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {loading ? 'Dreaming...' : 'Generate Image'}
                    </button>
                    {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
                </div>

                <div className="lg:col-span-2 bg-slate-950/50 rounded-xl border border-slate-700/50 flex items-center justify-center min-h-[300px] relative overflow-hidden group">
                    {imageUrl ? (
                        <>
                            <img src={imageUrl} alt="Generated History" className="w-full h-full object-contain" />
                            <a href={imageUrl} download="history_gen.png" className="absolute bottom-4 right-4 bg-black/70 hover:bg-black text-white px-3 py-1 rounded-lg text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                                Download
                            </a>
                        </>
                    ) : (
                        <div className="text-center text-slate-600">
                            <svg className="w-16 h-16 mx-auto mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <p className="text-sm">Your generated image will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ImageGenerator;
