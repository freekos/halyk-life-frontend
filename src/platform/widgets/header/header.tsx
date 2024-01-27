import { Logo } from '@/shared/assets/icons'
import { Link } from 'react-router-dom'

export const Header = () => {
	return (
		<div className={'w-full fixed h-20 flex justify-between items-center p-6 bg-[#EDEDED]'}>
			<Logo />
			<div className={'flex gap-5'}>
				<Link to=''>Консультант</Link>
				<Link to=''>Создать страховое событие</Link>
			</div>
		</div>
	)
}
