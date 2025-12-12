import React, { useState } from 'react';
import { Wand2, Share2, MapPin, ChevronDown, ChevronUp, Zap, Check, Clock, Info, ImageOff } from 'lucide-react';
import { generateRewardImage } from '../services/geminiService';

interface RewardDetailProps {
  progress: number;
  distance: number;
  onStartWalk: () => void;
  isWalking: boolean;
}

const RewardDetail: React.FC<RewardDetailProps> = ({ progress, distance, onStartWalk, isWalking }) => {
  // Using a very reliable, high-quality image of a blender/smoothie maker
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1595562662266-eb459d009228?q=80&w=1000&auto=format&fit=crop');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Constants to match screenshot data
  const originalPrice = 200.00;
  const salePrice = 100.00;
  const savings = originalPrice - salePrice;
  const claimedPercent = 78;

  const handleRegenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setImageError(false); // Reset error state before generating
    
    const newImage = await generateRewardImage(
      'A sleek, modern smart blender with a digital display on a minimalist kitchen counter, soft sage green wall background, professional product photography, cinematic lighting, 8k resolution, high detailed.'
    );
    
    if (newImage) {
      setImageUrl(newImage);
    }
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col gap-6 text-white font-sans">
      
      {/* Top Section: Image and Timer */}
      <div className="relative rounded-3xl overflow-hidden bg-bae-card border border-bae-hover shadow-2xl group">
        {/* Top Left Logo Badge */}
        <div className="absolute top-4 left-4 z-20">
           <div className="w-10 h-10 bg-bae-blue rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
              <Zap className="w-5 h-5 text-white fill-current" />
           </div>
        </div>

        {/* Top Right Timer Badge */}
        <div className="absolute top-4 right-4 z-20">
           <div className="bg-[#ef4444] text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg font-mono text-sm font-bold border border-red-400">
              <Clock className="w-3.5 h-3.5" />
              <span>02:14:36 Left</span>
           </div>
        </div>
        
        {/* Main Image */}
        <div className="aspect-[16/10] w-full relative bg-gray-900 flex items-center justify-center">
            {!imageError ? (
              <img 
                  src={imageUrl} 
                  alt="Smart Blender Pro" 
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isGenerating ? 'opacity-50 blur-sm' : ''}`}
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full bg-bae-hover text-bae-muted">
                 <ImageOff className="w-12 h-12 mb-2 opacity-50" />
                 <span className="text-sm font-medium">Image unavailable</span>
              </div>
            )}
            
            {/* AI Gen Button (Hidden utility) */}
            <button 
                onClick={handleRegenerate}
                className="absolute bottom-4 right-4 bg-black/50 backdrop-blur p-2 rounded-full text-white/70 hover:text-white transition-colors border border-white/10 z-30"
                title="Regenerate Image with AI"
            >
                <Wand2 className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Smart Blender Pro</h1>
          
          {/* Price Row */}
          <div className="flex items-center flex-wrap gap-3 mt-1">
             <span className="bg-bae-blue text-white px-2 py-0.5 rounded text-xs font-bold uppercase">50% OFF</span>
             <span className="text-bae-muted line-through decoration-1 text-lg">${originalPrice.toFixed(2)}</span>
             <span className="text-3xl font-bold text-bae-blue">${salePrice.toFixed(2)}</span>
             <span className="text-bae-green font-semibold text-sm">Save ${savings.toFixed(2)}</span>
          </div>

          {/* Stock Progress Row */}
          <div className="mt-4 mb-1">
              <div className="flex justify-between text-sm font-semibold mb-1.5">
                  <span>{claimedPercent}% Claimed</span>
                  <span className="text-bae-text">Only 12 Left!</span>
              </div>
              <div className="w-full bg-bae-hover rounded-full h-2.5 overflow-hidden">
                  <div className="bg-bae-blue h-full rounded-full w-[78%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              </div>
          </div>
          
          {/* Viewers Count */}
          <p className="text-red-500 text-xs font-medium flex items-center gap-1.5 mt-1">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
             </span>
             12 people are viewing this deal right now
          </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-2">
          <button 
             onClick={onStartWalk}
             disabled={isWalking || progress >= 100}
             className="flex-1 bg-bae-blue hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
             {isWalking ? (
                 <>
                    <Zap className="w-5 h-5 animate-pulse" />
                    Walking...
                 </>
             ) : progress >= 100 ? (
                 <>
                    <Check className="w-5 h-5" />
                    Deal Unlocked
                 </>
             ) : (
                 <>
                    <Zap className="w-5 h-5 fill-current" />
                    Grab Now
                 </>
             )}
          </button>
          <button className="flex-1 bg-transparent border border-bae-hover text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-bae-hover transition-colors">
             Save for Later
          </button>
      </div>

      {/* Redemption & Map Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Steps */}
          <div className="md:col-span-2 space-y-5">
             <h3 className="font-bold text-lg">Redemption</h3>
             <div className="flex gap-3">
                 <div className="w-6 h-6 rounded-full bg-bae-blue text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                 <div>
                    <p className="font-semibold text-sm">Buy & Redeem</p>
                    <p className="text-xs text-bae-muted mt-0.5">Purchase deal & get code via email.</p>
                 </div>
             </div>
             <div className="flex gap-3">
                 <div className="w-6 h-6 rounded-full bg-bae-blue text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                 <div>
                    <p className="font-semibold text-sm">Enjoy!</p>
                    <p className="text-xs text-bae-muted mt-0.5">Present code at any valid location.</p>
                 </div>
             </div>
          </div>

          {/* Mini Map Preview */}
          <div className="md:col-span-1">
              <div className="relative h-24 rounded-xl overflow-hidden border border-bae-hover group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=400&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" 
                    alt="Map Preview"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                     <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mb-1">
                        <MapPin className="w-4 h-4 text-white" />
                     </div>
                     <span className="text-[10px] font-bold text-white bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">View Locations</span>
                  </div>
              </div>
          </div>
      </div>

      <div className="border-t border-bae-hover my-2"></div>

      {/* Deal Highlights */}
      <div>
         <h3 className="font-bold text-lg mb-4">Deal Highlights</h3>
         <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-bae-muted">
             <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bae-muted" />
                <span>High-speed blending</span>
             </div>
             <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bae-muted" />
                <span>Durable construction</span>
             </div>
             <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bae-muted" />
                <span>Easy to clean</span>
             </div>
             <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-bae-muted" />
                <span>Multi-functional</span>
             </div>
         </div>
      </div>

      {/* Terms Dropdown */}
      <div className="border rounded-xl border-bae-hover overflow-hidden">
         <button 
           onClick={() => setIsTermsOpen(!isTermsOpen)}
           className="w-full flex items-center justify-between p-4 text-left hover:bg-bae-hover/50 transition-colors"
         >
            <span className="font-semibold text-sm">Terms & Conditions</span>
            {isTermsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
         </button>
         {isTermsOpen && (
             <div className="p-4 pt-0 text-xs text-bae-muted leading-relaxed border-t border-bae-hover/50 bg-bae-card/50">
                 Valid for in-store pickup only. Must present digital coupon at checkout. Expires in 24 hours after claiming.
             </div>
         )}
      </div>

      {/* Related Flash Deals */}
      <div className="mt-4">
          <h3 className="font-bold text-lg mb-4">Related Flash Deals</h3>
          <div className="grid grid-cols-2 gap-4">
              <div className="bg-bae-card border border-bae-hover rounded-xl p-3 flex flex-col gap-2 group cursor-pointer hover:border-bae-blue/50 transition-colors">
                  <div className="h-24 rounded-lg bg-black/20 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1583526978512-5b91b8d60655?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Toaster" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                      <h4 className="font-semibold text-xs truncate">Smart Toaster Oven</h4>
                      <p className="text-bae-blue font-bold text-sm">$80</p>
                  </div>
              </div>
               <div className="bg-bae-card border border-bae-hover rounded-xl p-3 flex flex-col gap-2 group cursor-pointer hover:border-bae-blue/50 transition-colors">
                  <div className="h-24 rounded-lg bg-black/20 overflow-hidden relative">
                      <img src="https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Coffee" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                      <h4 className="font-semibold text-xs truncate">Smart Coffee Maker</h4>
                      <p className="text-bae-blue font-bold text-sm">$50</p>
                  </div>
              </div>
          </div>
      </div>

    </div>
  );
};

export default RewardDetail;