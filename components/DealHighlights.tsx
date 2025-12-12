import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '../types';

interface DealHighlightsProps {
  product: Product;
}

const DealHighlights: React.FC<DealHighlightsProps> = ({ product }) => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-dark-border mt-6 transition-colors duration-300">
       <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Deal Highlights</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mb-6">
          {product.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
               <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                  <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
               </div>
               <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
            </div>
          ))}
       </div>

       <div className="border-t border-gray-100 dark:border-dark-border pt-4">
          <button 
            onClick={() => setIsTermsOpen(!isTermsOpen)}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="font-semibold text-gray-900 dark:text-white">Terms & Conditions</span>
            {isTermsOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
            )}
          </button>
          
          {isTermsOpen && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 space-y-2 animate-in slide-in-from-top-2 duration-200">
               <p>• Valid for new customers only.</p>
               <p>• Limit 1 per person.</p>
               <p>• Cannot be combined with other offers.</p>
               <p>• Shipping not included in the deal price.</p>
            </div>
          )}
       </div>
    </div>
  );
};

export default DealHighlights;