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
		<section className={clsx('h-full bg-white', className)}>
			<div className='w-full max-w-7xl mx-auto p-6 sm:my-20'>
				{(title || actions) && (
					<div className='flex items-center justify-between mb-4'>
						{title}
						{actions}
					</div>
				)}
				{children}
			</div>
		</section>
	)
}
