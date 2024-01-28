import { Logo } from '@/shared/assets/icons'
import { Button } from '@/shared/ui'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
	const [setPage, page] = useState<'aya' | 'insurance' | 'home'>('home')
	return (
		<div className={'w-full fixed h-20 z-30 flex gap-96 items-center p-6 bg-[#313338] lg:gap-9'}>
			<Logo />
			<div className={'flex gap-10'}>
				<Button shape={'outlined'} className={'border-primary text-primary'}>
					<Link to=''>AyaAI</Link>
				</Button>
				<Button shape={'outlined'} className={'border-primary text-primary'}>
					<Link to=''>Создать страховое событие</Link>
				</Button>
			</div>
		</div>
	)
}
