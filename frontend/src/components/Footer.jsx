import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto bg-White">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center gap-4">
        
        {/* Main Text */}
        <p className="font-sans text-sm text-primary font-medium tracking-wide text-center">
          © 2026 Stuck on You
        </p>

        {/* Slogan & Credit */}
        <div className="flex items-center gap-1 text-xs text-primary/70 font-sans">
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 fill-primary" /> for Valentine's Day
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;