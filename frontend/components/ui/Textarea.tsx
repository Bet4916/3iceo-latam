import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  maxChars?: number
  currentChars?: number
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, required, maxChars, currentChars, className, id, ...props }, ref) => {
    const textareaId = id ?? `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <div className="flex justify-between items-center">
            <label
              htmlFor={textareaId}
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
            {maxChars && (
              <span
                className="text-xs"
                style={{
                  color:
                    (currentChars ?? 0) > maxChars * 0.9
                      ? 'var(--color-error)'
                      : 'var(--color-text-muted)',
                }}
              >
                {currentChars ?? 0}/{maxChars}
              </span>
            )}
          </div>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'input resize-none',
            error && 'error',
            className
          )}
          rows={props.rows ?? 4}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />

        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-sm"
            role="alert"
            style={{ color: 'var(--color-error)', fontFamily: 'var(--font-body)' }}
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={`${textareaId}-hint`}
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

Textarea.displayName = 'Textarea'

export default Textarea
