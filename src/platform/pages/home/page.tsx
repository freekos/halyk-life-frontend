import { Hero } from '@/platform/pages/home/components/Hero.tsx'
import { Header } from '@/platform/widgets/header/header.tsx'

export function HomePage() {
	return (
		<div className={'w-screen h-screen'}>
			<Header />
			<Hero />
		</div>
	)
}
