import { Link } from 'react-router-dom';
import { StickyNote, Telescope } from 'lucide-react'; 
import bgImage from '../assets/bg.png';
import headingImage from '../assets/home-page.png';

const Home = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-16">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 -z-10">
        <img 
          src={bgImage} 
          alt="Background Texture" 
          className="w-full h-full object-cover opacity-90" 
        />
      </div>

      {/* Main Heading Image */}
      {/* Changed: Responsive widths (w-64 on mobile up to w-125 on desktop) */}
      <div className="mb-8 md:mb-10 hover:scale-105 transition-transform duration-500 ease-in-out">
        <img 
          src={headingImage} 
          alt="Stuck on You - Home Page" 
          className="w-72 sm:w-96 md:w-xl lg:max-w-2xl drop-shadow-sm object-contain" 
        />
      </div>

      {/* CTA Buttons */}
      {/* Changed: Flex-col on mobile for stacking, Flex-row on sm screens and up */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none justify-center">
        
        {/* Primary Button */}
        <Link 
          to="/submit" 
          className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-primary text-white font-sans font-semibold rounded-lg shadow-md hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
        >
          <StickyNote className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
          Stick a Note
        </Link>

        {/* Secondary Button */}
        <Link 
          to="/browse" 
          className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-white backdrop-blur-sm border-2 border-primary text-primary font-sans font-semibold rounded-lg shadow-sm hover:bg-primary hover:text-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
        >
          <Telescope className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
          See What Others Wrote
        </Link>

      </div>
    </div>
  );
};

export default Home;