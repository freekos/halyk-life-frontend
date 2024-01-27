import { Liquid, Logo } from '@/shared/assets/icons'
import { Button } from '@/shared/ui/button.tsx'

export const Links = () => {
	return (
		<div className={'w-full h-[45rem] flex flex-col justify-between items-center py-32'}>
			<h1 className={'text-3xl font-bold'}>Заботимся о вас каждый момент</h1>
			<div className={'w-full flex justify-evenly'}>
				<div
					className={
						'w-72 h-[25rem] flex flex-col items-center justify-evenly bg-inherit rounded-2xl overflow-hidden relative'
					}
				>
					<h2 className={'z-10 text-black text-xl font-bold'}>Читайте о нас в соц-сетях</h2>
					<Liquid />
				</div>
				<div className={'w-[500px] h-[25rem] flex justify-center items-center bg-[#82ECAD] rounded-2xl main-container'}>
					<Button size={'lg'}>Получить страховку</Button>
				</div>
				<div className={'w-72 h-[25rem] flex justify-center py-3 bg-red-300 rounded-2xl insurance-container'}>
					<Logo />
				</div>
			</div>
		</div>
	)
}
