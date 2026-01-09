
import React, { useState, useEffect } from 'react';
import { ExternalProduct, Language } from '../types';
import { translations } from '../translations';

interface ProductsToolProps {
  lang: Language;
}

const ProductsTool: React.FC<ProductsToolProps> = ({ lang }) => {
  const t = translations[lang].products;
  const [products, setProducts] = useState<ExternalProduct[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('duyit_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">{t.title}</h2>
        <p className="text-gray-400 max-w-xl mx-auto">{t.subtitle}</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-gray-500">{t.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="glass-panel p-6 rounded-3xl flex flex-col group hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">{p.name}</h3>
              <p className="text-sm text-gray-400 flex-1 mb-6 leading-relaxed">
                {p.description}
              </p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/5 border border-white/10 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-blue-400 py-3 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2"
              >
                {t.open}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsTool;
