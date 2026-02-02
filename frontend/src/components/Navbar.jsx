import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/submit', label: 'Write a Note' },
    { path: '/browse', label: 'Browse' },
    { path: '/about', label: 'About' },
  ];

  return (
    // Changed: px-4 for mobile, px-6 for larger screens. Added max-w constraints.
    <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 flex justify-between items-center transition-all duration-300 backdrop-blur-md bg-[#fdfbf7]/70 border-b border-primary shadow-sm">
      
      {/* Left Side: Logo */}
      <Link to="/" className="hover:opacity-80 transition-opacity shrink-0">
        {/* Changed: Smaller height on mobile (h-8), larger on md (h-10) */}
        <img 
          src={logo} 
          alt="Stuck on You" 
          className="h-8 md:h-10 w-auto object-contain" 
        />
      </Link>

      {/* Right Side: Navigation Links */}
      {/* Changed: Reduced gap on mobile (gap-4), increased on md/lg. Reduced text size on mobile. */}
      <div className="flex gap-4 sm:gap-10 md:gap-14 lg:gap-20 mr-0 sm:mr-4 md:mr-10 font-sans font-medium text-xs sm:text-sm md:text-base">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-primary decoration-primary underline-offset-4 transition-all duration-200 whitespace-nowrap
              ${isActive(link.path) 
                ? 'underline decoration-2 font-semibold' 
                : 'hover:underline decoration-2 opacity-80 hover:opacity-100'
              }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;