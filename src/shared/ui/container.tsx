import clsx from 'clsx'
import { type ReactNode } from 'react'

interface ContainerProps {
	title?: ReactNode
	actions?: ReactNode
	children: ReactNode
	className?: string
}

export function Container({ title, actions, children, className }: ContainerProps) {
	return (
		<div className={clsx('w-full max-w-2xl mx-auto p-6 sm:my-20', className)}>
			{(title || actions) && (
				<div className='flex items-center justify-between mb-4'>
					{title}
					{actions}
				</div>
			)}
			{children}
		</div>
	)
}
