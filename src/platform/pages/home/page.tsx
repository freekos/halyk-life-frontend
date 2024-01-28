import { RootLayout } from '@/platform/layout'
import { Hero } from '@/platform/pages/home/components/Hero.tsx'

export function HomePage() {
	return (
		<div className={'w-screen h-screen overflow-x-hidden'}>
			<RootLayout>
				<Hero />
			</RootLayout>
		</div>
	)
}
