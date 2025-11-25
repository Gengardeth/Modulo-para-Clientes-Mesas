import { Card } from './ui';

export default function ResumenCard({ titulo, valor, color = 'gray', icon: Icon }) {
  const colorSchemes = {
    gray: {
      bg: 'bg-gray-50',
      text: 'text-gray-900',
      label: 'text-gray-600',
      border: 'border-gray-200',
      dot: 'bg-gray-400',
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-900',
      label: 'text-green-600',
      border: 'border-green-200',
      dot: 'bg-green-400',
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-900',
      label: 'text-red-600',
      border: 'border-red-200',
      dot: 'bg-red-400',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      label: 'text-amber-600',
      border: 'border-amber-200',
      dot: 'bg-amber-400',
    },
  };

  const style = colorSchemes[color] || colorSchemes.gray;

  return (
    <Card className={`${style.bg} border-${color === 'gray' ? 'gray' : color}-200 p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-xs font-semibold ${style.label} uppercase tracking-wider mb-2`}>
            {titulo}
          </p>
          <p className={`${style.text} text-3xl font-bold tracking-tight`}>
            {valor}
          </p>
        </div>
        {Icon && (
          <div className={`${style.dot} rounded-full p-3 opacity-20`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
}
