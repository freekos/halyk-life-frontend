import type { ReactNode } from 'react'

interface FieldProps {
	children: ReactNode
	label?: string
	error?: string
}

export function Field({ children, label, error }: FieldProps) {
	return (
		<label className='flex gap-3 flex-col'>
			<span className='font-medium text-gray-500'>{label}</span>
			{children}
			{error && <FieldError error={error} />}
		</label>
	)
}

export function FieldError({ error }: { error: string }) {
	return <span>{error}</span>
}
