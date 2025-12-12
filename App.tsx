import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RewardDetail from './components/RewardDetail';
import LiveMap from './components/LiveMap';
import { MapPin } from 'lucide-react';

function App() {
  // Shared state for the simulation
  const [progress, setProgress] = useState(80); // 0 to 100
  const [distance, setDistance] = useState(80); // meters
  const [isWalking, setIsWalking] = useState(false);

  const startSimulation = () => {
    if (isWalking || progress >= 100) return;
    setIsWalking(true);
  };

  useEffect(() => {
    let interval: number;
    if (isWalking && progress < 100) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          const next = prev + 0.5;
          if (next >= 100) {
            setIsWalking(false);
            return 100;
          }
          return next;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isWalking, progress]);

  // Update distance based on progress
  useEffect(() => {
    const newDist = Math.max(0, Math.round(400 * (1 - progress / 100)));
    setDistance(newDist);
  }, [progress]);

  return (
    <div className="min-h-screen bg-bae-main text-bae-text">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Column: Details */}
          <div className="flex flex-col gap-6">
             <RewardDetail 
                progress={progress} 
                distance={distance} 
                onStartWalk={startSimulation}
                isWalking={isWalking}
             />
          </div>

          {/* Right Column: Map */}
          <div className="hidden lg:block h-[calc(100vh-120px)] sticky top-24">
             <LiveMap progress={progress} />
          </div>
          {/* Mobile Map Fallback (smaller) */}
          <div className="lg:hidden h-[400px]">
             <LiveMap progress={progress} />
          </div>
        </div>
      </main>

      <footer className="border-t border-bae-hover mt-12 py-8 bg-bae-card">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-2">
                <div className="bg-bae-blue text-white font-black text-xs px-1.5 py-0.5 rounded tracking-tighter">GR</div>
                <span className="font-bold text-white">GeoRewards</span>
             </div>
             <div className="flex gap-6 text-sm text-bae-muted">
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Contact Us</a>
             </div>
          </div>
      </footer>
    </div>
  );
}

export default App;