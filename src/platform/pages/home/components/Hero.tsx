import { Button } from '@/shared/ui/button.tsx'

import './hero.css'

export const Hero = () => {
	return (
		<div className={'flex w-full h-[700px] justify-evenly items-center bg-[#EDEDED]'}>
			<div className={'flex flex-col gap-2'}>
				<h1 className={'text-3xl font-bold'}>Безопасность и уверенность с Halyk Life</h1>
				<p>Широкий комплекс программ страхования жизни с условиями страхования</p>
				<div className={'flex gap-5 mt-5 relative'}>
					<Button size={'lg'}>Консультант</Button>
					<Button size={'lg'} shape={'outlined'} className={''}>
						Создать страховку
					</Button>
				</div>
			</div>
			<div className={'w-[40rem] h-[20rem] bg-red-500 rounded-2xl'} />
		</div>
	)
}
