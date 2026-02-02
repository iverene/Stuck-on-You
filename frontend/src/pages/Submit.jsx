import React, { useState } from 'react';

const Submit = () => {
  // Use the environment variable for the API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // Form State
  const [formData, setFormData] = useState({
    to: '',
    message: '',
    alias: '',
    color: '#ffcdd2', 
  });

  // State for handling feedback messages
  const [status, setStatus] = useState({ type: '', message: '' });

  const colors = [
    '#ffcdd2', '#fff59d', '#ef9a9a', '#90caf9', '#a5d6a7', '#ce93d8',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' }); // Clear previous status
    
    try {
      const response = await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Map frontend 'to' state to database 'to_name' column
        body: JSON.stringify({
          to_name: formData.to,
          message: formData.message,
          alias: formData.alias,
          color: formData.color,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Note successfully stuck to the wall!' });
        // Reset form after successful submission
        setFormData({ to: '', message: '', alias: '', color: '#ffcdd2' });
      } else if (response.status === 429) {
        // Handle Rate Limiting error specifically
        setStatus({ type: 'error', message: data.error || 'Too many submissions. Please wait an hour.' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to stick note.' });
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus({ type: 'error', message: 'Could not connect to the server. Please try again later.' });
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-10 min-h-[80vh] py-10">
      <div className="w-full max-w-lg px-6">
        
        {/* UI Feedback Message */}
        {status.message && (
          <div className={`mb-6 p-4 rounded-xl font-sans text-sm border ${
            status.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-red-200 text-red-700 animate-pulse'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="to" className="text-primary font-sans font-medium text-base">To (Optional)</label>
            <input
              type="text"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full border border-primary/60 bg-White rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              placeholder="e.g. Crushiecakes"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-primary font-sans font-medium text-base">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-primary/60 bg-White rounded-xl px-4 py-3 text-gray-700 resize-none focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              placeholder="Write your note here..."
            ></textarea>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="alias" className="text-primary font-sans font-medium text-base">Alias (Optional)</label>
            <input
              type="text"
              id="alias"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              className="w-full border border-primary/60 bg-White rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              placeholder="e.g. Secret Admirer"
            />
          </div>

          <div className="flex gap-3 mt-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-10 h-10 rounded-md transition-transform hover:scale-110 ${
                  formData.color === color ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={status.type === 'error' && status.message.includes('wait')}
            className="w-full mt-4 bg-primary text-white font-sans font-semibold text-lg py-2 rounded-xl shadow-md hover:bg-[#8f1312] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Stick to the Wall
          </button>
        </form>
      </div>
    </div>
  );
};

export default Submit;