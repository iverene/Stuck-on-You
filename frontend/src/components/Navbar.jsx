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
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-3 flex justify-between items-center transition-all duration-300 backdrop-blur-md bg-[#fdfbf7]/70 border-b-1 border-primary shadow-sm">
      
      {/* Left Side: Logo */}
      <Link to="/" className="hover:opacity-80 transition-opacity">
        <img 
          src={logo} 
          alt="Stuck on You" 
          className="h-10 w-auto object-contain" 
        />
      </Link>

      {/* Right Side: Navigation Links */}
      <div className="flex gap-20 mr-10 font-sans font-medium text-sm sm:text-base">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-primary decoration-primary underline-offset-4 transition-all duration-200
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