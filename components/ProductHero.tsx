import React, { useState, useEffect } from 'react';
import { Clock, Share2, Info, MapPin, ExternalLink, Zap, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { askAiAboutDeal, AiInsight } from '../services/geminiService';

interface ProductHeroProps {
  product: Product;
  userLocation: { lat: number; lng: number } | null;
}

const ProductHero: React.FC<ProductHeroProps> = ({ product, userLocation }) => {
  const [timeLeft, setTimeLeft] = useState(product.timeLeft);
  const [aiInsight, setAiInsight] = useState<AiInsight | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const percentageClaimed = Math.round((product.claimedItems / product.totalItems) * 100);
  const itemsLeft = product.totalItems - product.claimedItems;

  const handleAskAi = async () => {
    if (isAiLoading) return;
    setIsAiLoading(true);
    
    let question = "Is this a good deal compared to other smart blenders?";
    if (userLocation) {
        question = "Are there any stores nearby where I can find similar blenders, and is this online price better?";
    }

    const answer = await askAiAboutDeal(
        question, 
        product, 
        userLocation || undefined
    );
    
    setAiInsight(answer);
    setIsAiLoading(false);
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-dark-border flex flex-col lg:flex-row gap-8 transition-colors duration-300">
      {/* Left Column: Image */}
      <div className="w-full lg:w-1/2 relative group">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
            <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current" />
                Price Drop
            </div>
        </div>
        
        <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md font-mono text-sm font-medium border border-white/10">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTime(timeLeft)} Left</span>
        </div>

        <div className="bg-[#2C5F4D] dark:bg-[#1A202C] rounded-2xl h-[400px] w-full flex items-center justify-center overflow-hidden relative">
           {/* Abstract aesthetic background lighting */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
           
           {/* Product Image */}
           <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-[80%] object-contain drop-shadow-2xl z-10 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://placehold.co/600x600/1A202C/FFFFFF?text=Product+Image';
            }}
           />
           
           {/* Image carousel dots */}
           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
             <div className="w-2 h-2 bg-white rounded-full opacity-100"></div>
             <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
             <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
           </div>
        </div>
      </div>

      {/* Right Column: Details */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-900/30 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      Online Shopping
                    </span>
                 </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">High-Performance 1200W Motor • 3 Preset Programs</p>
            </div>
            <div className="flex gap-2">
               <button className="p-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-full transition-colors"><Share2 className="w-5 h-5"/></button>
            </div>
          </div>

          <div className="flex items-end gap-3 mb-6 mt-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${product.salePrice.toFixed(0)}
            </span>
             <span className="text-gray-400 line-through text-lg decoration-gray-400 decoration-1 mb-1">
              ${product.originalPrice.toFixed(0)}
            </span>
            <span className="text-green-500 text-sm font-medium mb-1.5 bg-green-500/10 px-2 py-0.5 rounded">
              -{product.discountPercentage}%
            </span>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-gray-900 dark:text-gray-300">{percentageClaimed}% Claimed</span>
              <span className="text-gray-900 dark:text-gray-300">Only {itemsLeft} Left!</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-brand-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${percentageClaimed}%` }}
              ></div>
            </div>
            <p className="text-red-500 text-xs font-medium mt-2 flex items-center gap-1.5">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              {product.viewers} people are viewing this deal
            </p>
          </div>

          <div className="flex gap-3 mb-8">
            <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-brand-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Buy Now
            </button>
            <button className="flex-1 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold py-3.5 px-6 rounded-xl transition-all active:scale-[0.98]">
              Add to Wishlist
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
             <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Redemption</h3>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                       <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                       <div>
                         <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">Buy & Redeem</p>
                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Code sent via email.</p>
                       </div>
                    </div>
                    <div className="flex gap-3">
                       <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                       <div>
                         <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">Enjoy!</p>
                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                           {userLocation ? 'Valid at partners nearby.' : 'Valid at any store.'}
                         </p>
                       </div>
                    </div>
                  </div>
                </div>
             </div>
             
             <div className="md:w-32 flex-shrink-0">
               <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border h-24 group cursor-pointer">
                  {/* Using a reliable Unsplash Map image */}
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                    alt="Location Map"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/200x200?text=Map';
                    }} 
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-white/90 dark:bg-black/80 backdrop-blur-sm py-1 text-center border-t border-gray-100 dark:border-gray-800">
                     <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300">
                        {userLocation ? 'Near You' : 'View Map'}
                     </span>
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30 relative transition-colors duration-300">
          <div className="flex items-start gap-3">
             <div className="bg-white dark:bg-blue-900/30 p-1.5 rounded-lg shadow-sm text-blue-600 dark:text-blue-400">
               <Info className="w-5 h-5" />
             </div>
             <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  {userLocation ? 'Local Deal Insight' : 'AI Deal Insight'}
                </h4>
                
                {aiInsight ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed animate-fade-in">{aiInsight.text}</p>
                    {aiInsight.sources && aiInsight.sources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-blue-100 dark:border-blue-800/30">
                            <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">Found nearby:</p>
                            <div className="flex flex-wrap gap-2">
                                {aiInsight.sources.map((source, idx) => (
                                    <a 
                                        key={idx} 
                                        href={source.uri} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-xs bg-white dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 px-2 py-1 rounded border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors"
                                    >
                                        <MapPin className="w-3 h-3" />
                                        <span className="truncate max-w-[150px]">{source.title}</span>
                                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-50" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {userLocation 
                      ? "Check local availability and compare prices with stores near you." 
                      : "Not sure? Ask our AI if this is the right blender for you."}
                  </p>
                )}
             </div>
             
             {!aiInsight && (
               <button 
                onClick={handleAskAi}
                disabled={isAiLoading}
                className="bg-white dark:bg-transparent border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
               >
                 {isAiLoading ? 'Analyzing...' : (userLocation ? 'Check Availability' : 'Ask AI')}
               </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;