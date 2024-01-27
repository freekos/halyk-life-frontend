import clsx from 'clsx'
import type { ReactNode } from 'react'

interface FieldProps {
	children: ReactNode
	className?: string
	label?: string
	error?: string | null
}

export function Field({ children, className, label, error }: FieldProps) {
	return (
		<label className={clsx('flex gap-3 flex-col', className)}>
			<span className='font-medium text-gray-500'>{label}</span>
			{children}
			{error && <FieldError error={error} />}
		</label>
	)
}

export function FieldError({ error }: { error: string }) {
	return <span className='text-sm text-red-500'>{error}</span>
}
