import React from 'react';

export default function Section({ title, subtitle, children, className = '' }) {
  return (
    <section className={className}>
      {title && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500 ml-4">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
