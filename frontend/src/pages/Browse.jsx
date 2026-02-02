import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import Navbar from '../components/Navbar';

const Browse = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real notes from the database
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/notes`);
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [API_URL]);

  const stickyNotes = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      rotation: Math.floor(Math.random() * 10) - 5,
      // Reduced random offset on mobile to prevent overflow
      offsetX: Math.floor(Math.random() * 10) - 5, 
      offsetY: Math.floor(Math.random() * 10) - 5,
    }));
  }, [notes]);

  return (
    // Changed: Reduced padding on mobile (px-2)
    <div className="relative w-full min-h-screen py-20 px-2 sm:px-4 flex justify-center items-start">
      <Navbar />
      <div 
        // Changed: Border thickness is smaller on mobile (border-8) and larger on md (border-16)
        className="relative w-full max-w-7xl min-h-[85vh] bg-[#d7a876] border-8 md:border-16 border-[#8b5a2b] rounded-lg shadow-2xl p-2 sm:p-8 overflow-hidden"
        style={{
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.3), 0 20px 25px -5px rgba(0,0,0,0.5)',
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px),
            radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-white font-sans">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl">Loading drama...</p>
          </div>
        ) : (
          // Changed: Gap reduced on mobile
          <div className="flex flex-wrap justify-center content-start gap-4 sm:gap-8 pt-6 pb-24">
            {stickyNotes.map((note) => (
              <div
                key={note.id}
                // Changed: Smaller note size on mobile (w-40 h-40) -> regular on sm (w-48 h-48)
                className="relative w-40 h-40 sm:w-48 sm:h-48 p-3 sm:p-4 shadow-lg hover:z-20 hover:scale-105 transition-all duration-300 flex flex-col cursor-pointer group"
                style={{
                  backgroundColor: note.color,
                  transform: `rotate(${note.rotation}deg) translate(${note.offsetX}px, ${note.offsetY}px)`,
                  fontFamily: 'Caveat, cursive', 
                }}
              >
                {/* Visual Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-sm border border-red-800 z-20"></div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-black/20 z-10"></div>

                <div className="grow flex flex-col justify-between items-center text-center h-full">
                  {note.to_name && (
                    <span className="text-xs font-bold opacity-60 mb-1 block border-b border-black/10 pb-1 w-full text-center truncate px-1">
                      To: {note.to_name}
                    </span>
                  )}
                  
                  {/* Changed: Smaller text on mobile */}
                  <p className="text-lg sm:text-xl leading-tight text-Black my-auto line-clamp-4 break-words w-full">
                    {note.message}
                  </p>

                  {note.alias && (
                    <span className="text-xs font-bold opacity-60 mt-1 block pt-1 w-full text-right truncate px-1">
                      - {note.alias}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-black/5 rounded-tl-lg"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link 
        to="/submit"
        // Changed: Smaller button on mobile (w-12 h-12) -> regular (w-16 h-16) on md
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-primary rounded-full shadow-2xl flex items-center justify-center hover:bg-[#8f1312] hover:-translate-y-1 transition-all z-50 group border-4 border-white"
      >
        <PenLine className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:rotate-12 transition-transform" />
      </Link>
    </div>
  );
};

export default Browse;