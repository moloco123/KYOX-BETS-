import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  siteName: string;
}

const Header: React.FC<HeaderProps> = ({ siteName }) => {
  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-10 p-4 text-center flex justify-between items-center">
      <div className="w-1/4"></div>
      <h1 className="text-3xl font-bold tracking-wider font-title w-1/2">
        {siteName.split('').map((char, index) => (
          <span
            key={index}
            className="sparkle-letter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      <div className="w-1/4 flex justify-end">
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;