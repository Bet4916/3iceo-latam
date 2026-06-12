import { cn } from '@/lib/utils'

type BadgeVariant = 'navy' | 'aqua' | 'pink' | 'neutral' | 'success' | 'error'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  navy:    { backgroundColor: 'var(--color-navy)',    color: 'white' },
  aqua:    { backgroundColor: 'var(--color-aqua)',    color: 'white' },
  pink:    { backgroundColor: 'var(--color-pink)',    color: 'var(--color-navy)' },
  neutral: { backgroundColor: 'var(--color-bg)',      color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' },
  success: { backgroundColor: '#d1fae5',              color: '#065f46' },
  error:   { backgroundColor: '#fee2e2',              color: 'var(--color-error)' },
}

export default function Badge({
  variant = 'aqua',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-poppins font-semibold rounded-full tracking-wide uppercase',
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1',
        className
      )}
      style={variantStyles[variant]}
      {...props}
    >
      {children}
    </span>
  )
}
