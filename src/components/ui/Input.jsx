import React from 'react';

export default function Input({ 
  label, 
  error, 
  className = '', 
  containerClass = '',
  ...props 
}) {
  return (
    <div className={`space-y-2 ${containerClass}`}>
      {label && (
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        className={`
          w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm
          outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-gray-300
          transition disabled:bg-gray-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:ring-red-500/40' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}
