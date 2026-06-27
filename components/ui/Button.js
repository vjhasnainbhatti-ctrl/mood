'use client'
import { motion } from 'framer-motion'

const Button = ({ children, variant = 'primary', size = 'md', className = '', isLoading = false, disabled = false, ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-lg',
    secondary: 'bg-white/20 text-gray-800 dark:text-white border border-white/30 hover:bg-white/30',
    ghost: 'bg-transparent hover:bg-white/10 text-gray-700 dark:text-gray-300',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg',
  }
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-base', lg: 'px-6 py-3 text-lg' }

  return (
    <motion.button whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }} whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || isLoading} {...props}>
      {isLoading && <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>}
      {children}
    </motion.button>
  )
}
export default Button
