export default function ResumenCard({ titulo, valor, color }) {
  const colorClasses = {
    gray: { bg: "bg-gray-50", text: "text-gray-900", label: "text-gray-600" },
    green: { bg: "bg-green-50", text: "text-green-900", label: "text-green-600" },
    red: { bg: "bg-red-50", text: "text-red-900", label: "text-red-600" },
    amber: { bg: "bg-amber-50", text: "text-amber-900", label: "text-amber-600" },
  };

  const styles = colorClasses[color] || colorClasses.gray;

  return (
    <div className={`${styles.bg} rounded-xl p-7 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300`}>
      <div className={`text-xs font-semibold ${styles.label} uppercase tracking-widest mb-4`}>
        {titulo}
      </div>
      <div className={`${styles.text} text-3xl font-semibold tracking-tight`}>
        {valor}
      </div>
    </div>
  );
}
