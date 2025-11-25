import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '', 
  ...props 
}) {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white border-red-500',
    success: 'bg-green-500 hover:bg-green-600 text-white border-green-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs font-medium',
    md: 'px-4 py-2 text-sm font-medium',
    lg: 'px-6 py-3 text-base font-semibold',
  };

  return (
    <button
      disabled={disabled}
      className={`
        rounded-lg border transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
