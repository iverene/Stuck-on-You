import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/submit', label: 'Write a Note' },
    { path: '/browse', label: 'Browse' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 transition-all duration-300 backdrop-blur-md bg-[#fdfbf7]/70 border-b border-primary shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left Side: Logo */}
        <Link 
          to="/" 
          className="hover:opacity-80 transition-opacity shrink-0"
          onClick={() => setIsOpen(false)} // Close menu if logo clicked
        >
          <img 
            src={logo} 
            alt="Stuck on You" 
            className="h-8 md:h-10 w-auto object-contain" 
          />
        </Link>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex gap-10 lg:gap-14 font-sans font-medium text-base">
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

        {/* Mobile Hamburger Button (Visible on Mobile) */}
        <button 
          className="md:hidden p-2 text-primary hover:bg-black/5 rounded-full transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown (Collapsible) */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#fdfbf7] border-b border-primary/20 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col py-4 px-4 gap-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)} // Close menu on click
              className={`w-full text-center py-2 text-lg text-primary decoration-primary underline-offset-4 transition-all duration-200
                ${isActive(link.path) 
                  ? 'underline decoration-2 font-bold bg-primary/5 rounded-lg' 
                  : 'hover:bg-primary/5 rounded-lg opacity-80'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;