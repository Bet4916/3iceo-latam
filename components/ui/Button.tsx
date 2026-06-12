import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import type { ButtonVariant, ButtonSize } from '@/types'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'inline-flex items-center justify-content-center gap-2 bg-transparent text-[var(--color-aqua)] font-poppins font-semibold px-5 py-3 rounded-brand border border-transparent transition-all duration-200 hover:bg-[var(--color-bg)] cursor-pointer',
  danger:    'inline-flex items-center justify-center gap-2 bg-[var(--color-error)] text-white font-poppins font-semibold px-7 py-3 rounded-brand border-none cursor-pointer transition-all duration-200 hover:opacity-90',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: '!py-2 !px-4 !text-sm',
  md: '',
  lg: '!py-4 !px-10 !text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          variantClasses[variant],
          sizeClasses[size],
          (disabled || isLoading) && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Cargando…
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
