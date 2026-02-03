import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto bg-White border-t border-primary/5">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:justify-between gap-4 md:gap-0">
        
        {/* Main Text: Center on mobile, Left on desktop */}
        <p className="font-sans text-sm text-primary font-medium tracking-wide text-center md:text-left">
          © 2026 Stuck on You
        </p>

        {/* Slogan & Credit: Center on mobile, Right on desktop */}
        <div className="flex items-center gap-1 text-xs text-primary/70 font-sans text-center md:text-right">
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 fill-primary" /> for Valentine's Day
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;