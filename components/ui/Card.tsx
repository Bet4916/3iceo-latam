import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'highlighted'
  padding?: 'sm' | 'md' | 'lg' | 'none'
  hover?: boolean
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', hover = true, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-brand',
          paddingClasses[padding],
          variant === 'default' && [
            'bg-white border border-[var(--color-border)]',
            'shadow-[var(--shadow-card)]',
            hover && 'transition-all duration-200 hover:shadow-[var(--shadow-brand)] hover:-translate-y-0.5 cursor-pointer',
          ],
          variant === 'flat' && 'bg-[var(--color-bg)] border border-[var(--color-border)]',
          variant === 'highlighted' && [
            'bg-[var(--color-navy)] text-white',
            'shadow-[var(--shadow-brand)]',
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// ─── Subcomponentes para composición ──────────────────────────

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function CardHeader({ title, subtitle, action, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3 mb-4', className)} {...props}>
      <div>
        <h3
          className="font-poppins font-semibold text-lg leading-snug"
          style={{ color: 'var(--color-navy)' }}
        >
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function CardDivider({ className }: { className?: string }) {
  return (
    <hr
      className={cn('my-4 border-0 border-t', className)}
      style={{ borderColor: 'var(--color-border)' }}
    />
  )
}

export default Card
