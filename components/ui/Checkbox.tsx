import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode
  error?: string
  hint?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const checkboxId = id ?? `checkbox-${Math.random().toString(36).slice(2, 7)}`

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={checkboxId}
          className="flex items-start gap-3 cursor-pointer group"
        >
          <div className="relative mt-0.5 shrink-0">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className={cn('sr-only peer', className)}
              {...props}
            />
            {/* Custom checkbox box */}
            <div
              className={cn(
                'w-5 h-5 rounded flex items-center justify-center border transition-all duration-200',
                'peer-focus-visible:shadow-[var(--shadow-focus)]',
                error
                  ? 'border-[var(--color-error)]'
                  : 'border-[var(--color-border)] peer-checked:border-[var(--color-aqua)] peer-checked:bg-[var(--color-aqua)]',
                'group-hover:border-[var(--color-aqua)]'
              )}
            >
              {/* Checkmark SVG — visible only when checked via peer */}
              <svg
                className="hidden peer-checked:block w-3 h-3 text-white absolute"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 6l3 3 5-5"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <span
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
          >
            {label}
          </span>
        </label>

        {error && (
          <p
            className="text-sm pl-8"
            role="alert"
            style={{ color: 'var(--color-error)', fontFamily: 'var(--font-body)' }}
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            className="text-sm pl-8"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
          >
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
