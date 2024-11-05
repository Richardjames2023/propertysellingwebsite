import React from 'react';
import myBackgroundVideo from '../assets/my-background-video.mp4'; // Adjust the path as necessary
import RegistrationForm from '../components/RegistrationForm';

const LandingContainer = () => {
  return (
    <div className="h-screen w-screen relative flex items-center justify-center overflow-hidden">
      <video 
        src={myBackgroundVideo} 
        autoPlay 
        loop 
        muted 
        className="absolute inset-0 object-cover w-full h-full" 
      />
      {/* Your content here */}
      <div className="relative z-10 text-white">
        <h1 className="text-4xl">Welcome to My Landing Page</h1>
        <RegistrationForm/>
      </div>
    </div>
  );
};

export default LandingContainer;