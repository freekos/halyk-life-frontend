import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { type ComponentProps, forwardRef, type ReactNode, useState } from 'react'

interface InputProps extends ComponentProps<'input'> {
	icon?: {
		left?: ReactNode
		right?: ReactNode
	}
	error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ type = 'text', icon = {}, error, className, ...props }: InputProps,
	ref,
) {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	if (type === 'password') {
		const PasswordIcon = showPassword ? EyeSlashIcon : EyeIcon

		icon.right = <PasswordIcon className='w-5 h-5 text-gray-400' onClick={() => setShowPassword((prev) => !prev)} />
	}

	return (
		<div className='relative'>
			{icon.left && <span className='absolute inset-y-0 right-5 flex items-center'>{icon.left}</span>}
			<input
				className={clsx(
					`w-full px-8 py-5 font-medium rounded-md bg-white border border-gray-300 focus:outline-none focus:border-secondary/80 disabled:opacity-50 sm:text-sm`,
					!!error && 'border-red-500',
					icon.left && 'pl-16',
					icon.right && 'pr-16',
					className,
				)}
				type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
				ref={ref}
				{...props}
			/>

			{icon.right && <span className='absolute inset-y-0 right-5 flex items-center'>{icon.right}</span>}
		</div>
	)
})
