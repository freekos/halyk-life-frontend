import { RootLayout } from '@/platform/layout'
import { Hero } from '@/platform/pages/home/components/Hero.tsx'
import { useParams } from 'react-router'

export function HomePage() {
	const { iin } = useParams()
	if (iin) {
		window.location.hash = 'insurance-form'
	}
	return (
		<div className={'w-screen h-screen overflow-x-hidden'}>
			<RootLayout>
				<Hero />
			</RootLayout>
		</div>
	)
}
