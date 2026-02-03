import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PenLine } from 'lucide-react';

const Submit = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); 

  // Form State
  const [formData, setFormData] = useState({
    to: '',
    message: '',
    alias: '',
    color: '#ffcdd2', // Default Pink
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  // Lighter pastel colors for better readability
  const colors = [
    '#ffcdd2', // Pink
    '#fff59d', // Yellow
    '#ef9a9a', // Red/Salmon
    '#90caf9', // Blue
    '#a5d6a7', // Green
    '#ce93d8', // Purple
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_name: formData.to,
          message: formData.message,
          alias: formData.alias,
          color: formData.color,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Update status to show success
        setStatus({ type: 'success', message: 'Stuck! Redirecting to wall...' });
        setFormData({ to: '', message: '', alias: '', color: '#ffcdd2' });

        // 4. Redirect to /browse after 1.5 seconds
        setTimeout(() => {
          navigate('/browse');
        }, 1500);

      } else if (response.status === 429) {
        setStatus({ type: 'error', message: data.error || 'Too many submissions. Please wait an hour.' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to stick note.' });
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus({ type: 'error', message: 'Could not connect to the server.' });
    }
  };

  return (
    <div className="w-full min-h-screen relative flex flex-col">
      <Navbar />

      {/* 1. The Notebook Sheet Surface (Background) */}
      <div 
        className="flex-grow flex items-center justify-center pt-24 pb-10 px-4 sm:px-8 md:px-12 relative overflow-hidden"
        style={{
          backgroundColor: '#fdfbf7', // Paper White
          // CSS Gradients for Notebook Lines and Margin
          backgroundImage: `
            linear-gradient(90deg, transparent 40px, #ab161520 41px, transparent 41px), /* Red Margin Line */
            repeating-linear-gradient(0deg, #e5e7eb 0px, #e5e7eb 1px, transparent 1px, transparent 28px) /* Horizontal Blue/Gray Lines */
          `,
          backgroundAttachment: 'local' // Ensures lines scroll with content if needed
        }}
      >
        
        {/* Status Messages (Floating above) */}
        {status.message && (
          <div className={`absolute top-28 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-xl font-sans text-sm font-bold tracking-wide transform transition-all duration-300 w-max max-w-[90%] text-center ${
            status.type === 'success' 
              ? 'bg-green-100 text-green-800 border-2 border-green-200' 
              : 'bg-red-100 text-red-800 border-2 border-red-200'
          }`}>
            {status.message}
          </div>
        )}

        {/* 2. Container for Note + Controls */}
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col gap-8 items-center pl-8 sm:pl-0 transition-all duration-300"> 
          
          {/* THE STICKY NOTE (Input Form) */}
          <form 
            onSubmit={handleSubmit}
            className="w-full aspect-square sm:aspect-[4/3] md:aspect-[4/3] shadow-2xl transition-colors duration-500 ease-in-out relative flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 transform rotate-1 hover:rotate-0 transition-transform"
            style={{ 
              backgroundColor: formData.color,
              fontFamily: '"Caveat", cursive', // Handwritten font
              boxShadow: '15px 15px 40px rgba(0,0,0,0.2), inset 0 0 20px rgba(0,0,0,0.05)' 
            }}
          >
            {/* Visual: Tape at top */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 sm:w-32 md:w-40 h-8 sm:h-10 bg-white/40 backdrop-blur-sm rotate-[-2deg] shadow-sm border border-white/50"></div>

            {/* To Input */}
            <div className="flex items-end gap-2 mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl md:text-3xl text-black/60 font-bold">To:</span>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="Someone special..."
                maxLength={30}
                className="flex-grow bg-transparent border-b-2 border-black/20 focus:border-black/40 outline-none text-2xl sm:text-3xl md:text-4xl text-gray-900 placeholder:text-black/30 pb-1 transition-colors"
              />
            </div>

            {/* Message Area */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your feelings here..."
              className="flex-grow w-full bg-transparent border-none outline-none resize-none text-2xl sm:text-3xl md:text-4xl text-gray-900 placeholder:text-black/30 leading-relaxed"
            ></textarea>

            {/* Alias Input (Bottom Right) */}
            <div className="flex items-center justify-end gap-2 mt-4 sm:mt-6">
              <span className="text-xl sm:text-2xl md:text-3xl text-black/60 font-bold">-</span>
              <input
                type="text"
                name="alias"
                value={formData.alias}
                onChange={handleChange}
                placeholder="Your Alias"
                maxLength={20}
                className="w-2/3 sm:w-1/2 bg-transparent border-b-2 border-black/20 focus:border-black/40 outline-none text-xl sm:text-2xl md:text-3xl text-gray-900 text-right placeholder:text-black/30 pb-1 transition-colors"
              />
            </div>

          </form>

          {/* 3. CONTROLS (On the Notebook Paper) */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/50 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100/80 shadow-sm">
            
            {/* Color Palette */}
            <div className="flex gap-3 p-1">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full transition-all transform hover:scale-110 shadow-sm ${
                    formData.color === color 
                      ? 'border-[3px] border-gray-400 scale-110 ring-2 ring-white' 
                      : 'border-2 border-gray-200 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit} 
              disabled={status.type === 'error' && status.message.includes('wait')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#ab1615] hover:bg-[#8f1312] text-white font-sans font-bold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed group text-sm sm:text-base"
            >
              <PenLine className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Stick It!
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Submit;