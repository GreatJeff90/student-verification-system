// components/UI/Card.tsx - Enhanced version
import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  variant?: 'default' | 'elevated' | 'outlined'
}

export default function Card({ 
  children, 
  className,
  padding = 'md',
  hover = false,
  variant = 'default'
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-sm border border-gray-200',
    outlined: 'bg-transparent border border-gray-300'
  }

  return (
    <div className={clsx(
      'rounded-xl transition-all duration-200',
      variants[variant],
      paddings[padding],
      hover && 'hover:shadow-md hover:border-gray-300',
      className
    )}>
      {children}
    </div>
  )
}