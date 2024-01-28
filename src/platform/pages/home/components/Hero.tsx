import { Button } from '@/shared/ui/button.tsx'

import './hero.css'

export const Hero = () => {
	return (
		<div className={'flex w-full h-screen justify-evenly items-center bg-[#313338] lg:flex-col-reverse pt-32'}>
			<div className={'flex flex-col gap-2'}>
				<h1 className={'text-3xl font-bold text-emerald-500'}>Айя - ваш страховой ассистент</h1>
				<p className={'text-white'}>Ваш страховой партнер научился думать: приветствуйте AyaAI</p>
				<div className={'flex gap-5 mt-5 relative'}>
					<Button size={'lg'} className={'border-white'}>
						Задать вопрос
					</Button>
					<Button size={'lg'} shape={'outlined'} className={'border-white text-white'}>
						Создать страховку
					</Button>
				</div>
			</div>
			<div className={'w-[30rem] h-[20rem] rounded-2xl hero'} />
		</div>
	)
}
