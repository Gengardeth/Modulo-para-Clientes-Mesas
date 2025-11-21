export default function TabButton({ active, onClick, children }){
  return (
    <button onClick={onClick} className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 border ${active ? "bg-blue-500 text-white border-blue-500 shadow-sm hover:bg-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"}`}>{children}</button>
  );
}
