import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  placeholder?: string
  options: SelectOption[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, required, placeholder, options, className, id, ...props }, ref) => {
    const selectId = id ?? `select-${label?.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="font-poppins font-semibold text-sm"
            style={{ color: 'var(--color-navy)' }}
          >
            {label}
            {required && (
              <span className="ml-1" style={{ color: 'var(--color-error)' }}>
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'input appearance-none cursor-pointer pr-10',
              error && 'error',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {error && (
          <p
            id={`${selectId}-error`}
            className="text-sm"
            role="alert"
            style={{ color: 'var(--color-error)', fontFamily: 'var(--font-body)' }}
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={`${selectId}-hint`}
            className="text-sm"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
          >
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
