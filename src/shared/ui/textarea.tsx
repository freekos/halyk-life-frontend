import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'

interface TextAreaProps extends ComponentProps<'textarea'> {
	error?: string | null
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
	{ className, error, ...props },
	ref,
) {
	return (
		<textarea
			className={clsx(
				`w-full px-2 py-4 font-medium rounded-md bg-white border border-gray-300 focus:outline-none focus:border-primary/80 disabled:opacity-50 sm:text-base`,
				!!error && 'border-red-500',
				className,
			)}
			ref={ref}
			{...props}
		/>
	)
})
