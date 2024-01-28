import type { ReactNode } from 'react'

export function RootLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex flex-1 flex-col h-full relative'>
			{/* <Header /> */}
			{children}
		</div>
	)
}
