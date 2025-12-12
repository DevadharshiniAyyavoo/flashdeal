import React from 'react';

const relatedProducts = [
  { id: '1', name: 'Smart Toaster Oven', price: 80, image: 'https://images.unsplash.com/photo-1583526978512-5b91b8d60655?q=80&w=400&auto=format&fit=crop' },
  { id: '2', name: 'Smart Coffee Maker', price: 50, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=400&auto=format&fit=crop' },
  { id: '3', name: 'Smart Food Processor', price: 120, image: 'https://images.unsplash.com/photo-1570222094114-28a9d88a27e6?q=80&w=400&auto=format&fit=crop' },
];

const RelatedDeals: React.FC = () => {
  return (
    <div className="mt-8 mb-12">
      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Related Flash Deals</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {relatedProducts.map((item) => (
          <div key={item.id} className="min-w-[200px] md:min-w-[240px] bg-white dark:bg-dark-card rounded-2xl p-3 border border-gray-100 dark:border-dark-border hover:shadow-md transition-all cursor-pointer group">
            <div className="h-32 rounded-xl bg-gray-50 dark:bg-black/20 overflow-hidden mb-3 relative">
               <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded font-medium z-10">
                 In-Store Shopping
               </div>
               <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/400x300?text=Product';
                }}
               />
            </div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 truncate">{item.name}</h4>
            <div className="flex items-center justify-between">
                <p className="font-bold text-gray-900 dark:text-white">${item.price}</p>
                <button className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                    Buy
                </button>
            </div>
          </div>
        ))}
        {/* Skeleton/Placeholder loader look-alike */}
        <div className="min-w-[200px] md:min-w-[240px] bg-white dark:bg-dark-card rounded-2xl p-3 border border-gray-100 dark:border-dark-border opacity-50">
            <div className="h-32 rounded-xl bg-gray-100 dark:bg-gray-800 mb-3"></div>
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default RelatedDeals;