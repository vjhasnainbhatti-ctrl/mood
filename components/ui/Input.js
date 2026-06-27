'use client'

const Input = ({ label, error, icon, className = '', type = 'text', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
    <div className="relative">
      {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">{icon}</div>}
      <input type={type}
        className={`w-full px-4 py-2.5 ${icon ? 'pl-10' : ''} bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-xl text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-xl transition-all duration-300 ${error ? 'border-red-400 focus:ring-red-400' : ''} ${className}`}
        {...props} />
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
)
export default Input
