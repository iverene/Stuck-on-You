import bgImage from '../assets/bg.png';
import aboutPageImg from '../assets/about-page.png'; 
import idIverene from '../assets/id-iverene.png';    
import idJarey from '../assets/id-jarey.png';       

const About = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-12 px-4">
      
      {/* 1. Background Layer */}
      <div className="absolute inset-0 -z-10">
        <img 
          src={bgImage} 
          alt="Background Texture" 
          className="w-full h-full object-cover opacity-95" 
        />
      </div>

      {/* 2. Main Content Container */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20">
        
        {/* Left Side: About Page Content */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img 
            src={aboutPageImg} 
            alt="About Stuck on You" 
            className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-xl hover:scale-[1.02] transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Right Side: Developer IDs */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-6 relative">
          
          {/* Developer 1 (Iverene) */}
          <a 
            href="https://github.com/iverene" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative group block transform -rotate-3 hover:scale-105 hover:z-10 transition-all duration-300 cursor-pointer"
          >
            <img 
              src={idIverene} 
              alt="Frontend Developer - Iverene" 
              className="w-64 sm:w-72 lg:w-80 shadow-lg rounded-xl border-2 border-white/20"
            />
          </a>

          {/* Developer 2 (Jarey) */}
          <a 
            href="https://github.com/BagunasJohnrey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative group block transform -rotate-3 translate-x-4 -translate-y-4 hover:scale-105 hover:translate-y-0 hover:z-10 transition-all duration-300 cursor-pointer"
          >
            <img 
              src={idJarey} 
              alt="Backend Developer - Jarey" 
              className="w-64 sm:w-72 lg:w-80 shadow-lg rounded-xl border-2 border-white/20"
            />
          </a>

        </div>

      </div>
    </div>
  );
};

export default About;