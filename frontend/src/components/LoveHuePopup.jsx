import { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import loveHueLogo from '../assets/love-hue-logo.png'; 

const LoveHuePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Show popup 3.5 seconds after the site loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (isClosed) return null;

  return (
    // Changed: Adjusted positioning. right-4 bottom-4 for mobile, right-6 bottom-6 for desktop.
    <div 
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-60 max-w-[90vw] sm:max-w-sm w-full bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 transition-all duration-700 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      {/* Close Button */}
      <button 
        onClick={() => setIsClosed(true)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 bg-transparent hover:bg-gray-100 p-1 rounded-full transition-colors cursor-pointer"
      >
        <X size={16} />
      </button>

      <div className="flex items-start gap-3 sm:gap-4">
        {/* Logo Section */}
        <div className="shrink-0 bg-pink-50 rounded-xl p-2 border border-pink-100">
          <img 
            src={loveHueLogo} 
            alt="LoveHue Logo" 
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-1 pr-4">
          <h3 className="font-sans font-bold text-gray-800 text-sm uppercase tracking-wide">
            LOVE HUE
          </h3>
          
          <p className="font-sans text-gray-600 text-xs sm:text-sm leading-snug mb-3">
            Unlock your heart's palette! Discover your unique love language spectrum and see what color your love truly is.
          </p>

          {/* CTA Button */}
          <a 
            href="https://love-hue.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-pink-500 to-rose-500 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all transform hover:-translate-y-0.5"
          >
            Visit LoveHue
            <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoveHuePopup;