'use client'
import { forwardRef } from 'react'

const GlassCard = forwardRef(({ children, className = '', hover = true, onClick, ...props }, ref) => (
  <div ref={ref} onClick={onClick}
    className={`backdrop-blur-xl bg-white/20 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-2xl shadow-xl ${hover ? 'hover:shadow-2xl hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-300' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    {...props}>{children}</div>
))
GlassCard.displayName = 'GlassCard'
export default GlassCard
