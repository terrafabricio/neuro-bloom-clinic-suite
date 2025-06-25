
import React from 'react';

interface NeuroClinicLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function NeuroClinicLogo({ size = 'md', showText = true, className = '' }: NeuroClinicLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-neuro-blue-500 to-neuro-green-500 rounded-xl flex items-center justify-center shadow-lg`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-2/3 h-2/3 text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.66 13.66 12 12 12S9 10.66 9 12V7.5L3 7V9C3 10.66 4.34 12 6 12S9 10.66 9 12C9 15.31 11.69 18 15 18V22H9V18C5.69 18 3 15.31 3 12V9L9 8.5V12C9 13.1 9.9 14 11 14H13C14.1 14 15 13.1 15 12V8.5L21 9Z" 
            fill="currentColor"
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-heading font-bold ${textSizeClasses[size]} text-neuro-blue-700 leading-none`}>
            NeuroClinic
          </span>
          <span className="text-xs text-neuro-green-600 font-medium">
            Cuidado Multidisciplinar
          </span>
        </div>
      )}
    </div>
  );
}
