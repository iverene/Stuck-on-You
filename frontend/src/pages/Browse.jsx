import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';

// 1. Mock Data 
const MOCK_NOTES = [
  { id: 1, message: "I saw you at the coffee shop today. You dropped your scarf.", to: "Blue Scarf Girl", from: "Guy in Black", color: "#ffcdd2" },
  { id: 2, message: "Sorry for eating your lunch. It looked too good.", to: "Roommate", from: "Hungry Ghost", color: "#fff59d" },
  { id: 3, message: "Happy Valentine's Day to myself! Self love is the best love.", to: "Me", from: "Me", color: "#a5d6a7" },
  { id: 4, message: "To the guy who held the elevator: thank you.", to: "Elevator Guy", from: "Rushed Girly", color: "#90caf9" },
  { id: 5, message: "I still think about us sometimes.", to: "J", from: "K", color: "#ce93d8" },
  { id: 6, message: "You are doing great. Keep going.", to: "Stranger", from: "A Friend", color: "#ef9a9a" },
  { id: 7, message: "Can we please stop pretending we don't know each other?", to: "Ex-Colleague", from: "Anon", color: "#fff59d" },
  { id: 8, message: "Your laugh is my favorite sound.", to: "Crush", from: "Secret Admirer", color: "#ffcdd2" },
  { id: 9, message: "I love your coding skills!", to: "Dev", from: "Designer", color: "#a5d6a7" },
  { id: 10, message: "Hi cutie!", to: "Jarey", from: "Iverene", color: "#90caf9" },
];

const Browse = () => {
  const stickyNotes = useMemo(() => {
    return MOCK_NOTES.map((note) => ({
      ...note,
      rotation: Math.floor(Math.random() * 10) - 5, // Random rotation between -5deg and 5deg
      offsetX: Math.floor(Math.random() * 20) - 10, // Slight X offset
      offsetY: Math.floor(Math.random() * 20) - 10, // Slight Y offset
    }));
  }, []);

  return (
    <div className="relative w-full min-h-screen py-20 px-4 flex justify-center items-start">

      <div 
        className="relative w-full max-w-7xl min-h-[85vh] bg-[#d7a876] border-16 border-[#8b5a2b] rounded-lg shadow-2xl p-4 sm:p-8 overflow-hidden"
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

        {/* Notes Grid - "Scattered" Layout */}
        <div className="flex flex-wrap justify-center content-start gap-6 sm:gap-8 pt-6 pb-24">
          {stickyNotes.map((note) => (
            <div
              key={note.id}
              className="relative w-48 h-48 p-4 shadow-lg hover:z-20 hover:scale-105 transition-all duration-300 flex flex-col cursor-pointer group"
              style={{
                backgroundColor: note.color,
                transform: `rotate(${note.rotation}deg) translate(${note.offsetX}px, ${note.offsetY}px)`,
                fontFamily: 'Caveat, cursive', 
              }}
            >
              {/* Pushpin (CSS Visual) */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-sm border border-red-800 z-20"></div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-black/20 z-10"></div>

              {/* Note Content */}
              <div className="grow flex flex-col justify-between items-center text-center h-full">
                
                {/* To Section */}
                {note.to && (
                  <span className="text-xs font-bold opacity-60 mb-1 block border-b border-black/10 pb-1 w-full text-center">
                    To: {note.to}
                  </span>
                )}
                
                {/* Message - Reduced text size to text-lg/xl to fit smaller note */}
                <p className="text-xl leading-tight text-Black my-auto line-clamp-4">
                  {note.message}
                </p>

                {/* NEW: From Section */}
                {note.from && (
                  <span className="text-xs font-bold opacity-60 mt-1 block pt-1 w-full text-right">
                    - {note.from}
                  </span>
                )}
              </div>

              {/* Subtle visual fold corner */}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-black/5 rounded-tl-lg"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <Link 
        to="/submit"
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary rounded-full shadow-2xl flex items-center justify-center hover:bg-[#8f1312] hover:-translate-y-1 transition-all z-50 group border-4 border-white"
        title="Write a Note"
      >
        <PenLine className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
      </Link>

    </div>
  );
};

export default Browse;