import React, { useState } from 'react';

const Submit = () => {
  // Form State
  const [formData, setFormData] = useState({
    to: '',
    message: '',
    alias: '',
    color: '#faa0a0', 
  });

  // Sticky Note Color Options
const colors = [
    '#ffcdd2', // Light Pink
    '#fff59d', // Light Yellow
    '#ef9a9a', // Light Red/Salmon
    '#90caf9', // Light Blue
    '#a5d6a7', // Light Green
    '#ce93d8', // Lavender
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Stuck Note Data:', formData);
    // Add logic here to send data to your backend
    alert('Note Stuck! (Check console for data)');
  };

  return (
    <div className="w-full flex items-center justify-center mt-10 min-h-[80vh] py-10">
      <div className="w-full max-w-lg px-6">
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* To (Optional) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="to" className="text-primary font-sans font-medium text-base">
              To (Optional)
            </label>
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

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-primary font-sans font-medium text-base">
              Message
            </label>
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

          {/* Alias (Optional) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="alias" className="text-primary font-sans font-medium text-base">
              Alias (Optional)
            </label>
            <input
              type="text"
              id="alias"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              className="w-full border border-primary/60 bg-White rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              placeholder="e.g. Secret Admirer, Your future gf"
            />
          </div>

          {/* Color Picker */}
          <div className="flex gap-3 mt-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-10 h-10 rounded-md transition-transform hover:scale-110 ${
                  formData.color === color 
                    ? 'ring-2 ring-offset-2 ring-primary scale-110' 
                    : ''
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-primary text-white font-sans font-semibold text-lg py-2 rounded-xl shadow-md hover:bg-[#8f1312] hover:shadow-lg transition-all active:scale-95"
          >
            Stick to the Wall
          </button>

        </form>
      </div>
    </div>
  );
};

export default Submit;