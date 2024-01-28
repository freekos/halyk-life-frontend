import { Header } from '@/platform/widgets/header/header.tsx'
import type { ReactNode } from 'react'

export function RootLayout({ children }: { children: ReactNode }) {
	return (
		<div className='h-screen relative'>
			<Header />
			{children}
		</div>
	)
}
