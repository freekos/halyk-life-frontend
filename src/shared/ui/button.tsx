import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ouline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				primary: 'bg-primary hover:bg-primary/90 text-white',
				secondary: 'bg-secondary hover:bg-secondary/90 text-white',
				black: 'bg-black hover:bg-black/90 text-white',
				success: '',
				info: '',
				danger: '',
				gray: 'bg-[#EFF0F6] hover:bg-slate-200/80',
			},
			size: {
				lg: 'px-6 py-5 text-lg',
				md: 'px-5 py-3 text-base',
				sm: 'px-4 py-2 text-sm',
				icon: 'h-9 w-9',
			},
			shape: {
				outlined: 'bg-transparent',
				filled: '',
			},
		},
		compoundVariants: [
			{
				variant: 'primary',
				shape: 'outlined',
				class: 'border border-primary text-primary hover:bg-primary/70 hover:text-white',
			},
			{
				variant: 'black',
				shape: 'outlined',
				class: 'border border-black text-black hover:bg-black/70 hover:text-white',
			},
			{
				variant: 'gray',
				shape: 'filled',
				class: 'text-slate-500',
			},
		],
		defaultVariants: {
			variant: 'primary',
			size: 'md',
			shape: 'filled',
		},
	},
)

type ButtonVariants = VariantProps<typeof buttonVariants>

export interface Props extends ComponentProps<'button'>, ButtonVariants {}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
	{ className, variant, size, shape, children, ...props }: Props,
	ref,
) {
	return (
		<button className={buttonVariants({ variant, size, shape, className })} ref={ref} {...props}>
			{children}
		</button>
	)
})
