import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/view-trip/[tripId]/components/Footer';

function Hero() {
  return (
    <div  className="flex flex-col items-center mx-4 md:mx-16 lg:mx-56 gap-6">
      <div className="text-center mt-12">
        <h4 className="font-bold text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#4589ff] to-[#ff03e6]">
          Discover Your Next Adventure with AI:
          <span className=' text-[#8b00d686]'> Personalized Trips Tailored to Your Preferences and Interests.</span>
        </h4>
        <p className='text-lg md:text-xl lg:text-2xl text-[#6f00ff] mt-5'>
          Your personal trip planner and travel guide, creating custom trips to your interests and budget.
        </p>
        <Link to={'/create-trip'}>
        {/* {this is for animation for button} */}
        <style>
        {`
          @keyframes gradientMove {
            20% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

          <Button style={{
        background: "linear-gradient(90deg, #8290ff, #ec9eff, #fc7a7a)",
        backgroundSize: "200% 200%",
        animation: "gradientMove 8s ease infinite",
      }} className=" border-[2px]  border-[#fff] mt-6 hover:border-[#a6e3f7]   hover:text-[#a6e3f7] ">Get Started, it's free</Button>
        </Link>
      </div>
      
      {/* Centered Image Section */}
      <div className="flex justify-center w-full mt-3">
        <img 
          src="/Group 1.png" 
          className='w-full max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] h-auto' 
          alt="Illustration of travel planning" 
        />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Hero;