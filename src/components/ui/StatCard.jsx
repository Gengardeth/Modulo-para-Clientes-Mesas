import React from 'react';

export default function StatCard({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  trend,
  color = 'blue' 
}) {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-400',
    green: 'from-green-600 to-green-400',
    red: 'from-red-600 to-red-400',
    amber: 'from-amber-600 to-amber-400',
    purple: 'from-purple-600 to-purple-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-semibold opacity-90 mb-1">{title}</p>
          <h3 className="text-4xl font-bold">{value}</h3>
        </div>
        {Icon && (
          <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
            <Icon className="w-8 h-8" />
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-xs opacity-75 mb-2">{subtitle}</p>
      )}
      {trend && (
        <div className="text-xs font-semibold bg-white/20 rounded-lg px-2 py-1 w-fit backdrop-blur-sm">
          {trend}
        </div>
      )}
    </div>
  );
}
