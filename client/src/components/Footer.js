import React from 'react';

function Footer() {
  return (
    <footer className="text-center ml-4 py-3 text-gray-800 bg-gray-100 relative">
      Made with
      <span className="inline-block relative">
        <span className="animate-pulse absolute h-full w-full top-0 left-0 transform scale-150 heart-color"> &#10084; </span>
        <span className="relative ml-2 mr-2">❤</span>
      </span>
       by <span className="name inline-block relative text-blue-500">Miraj Asraf</span>
    </footer>
  );
}

export default Footer;
