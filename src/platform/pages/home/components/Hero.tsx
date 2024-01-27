export const Hero = () => {
	return (
		<div className={'flex w-full h-[45rem] justify-evenly items-center bg-[#EDEDED]'}>
			<div className={'flex flex-col gap-2'}>
				<h1 className={'text-3xl font-bold'}>Безопасность и уверенность с Halyk Life</h1>
				<p>Широкий комплекс программ страхования жизни с условиями страхования</p>
				<div className={'flex gap-5 mt-5'}>
					<button className={'bg-[#00805F] text-white p-4 px-6 rounded-xl'}>Консультант</button>
					<button className={'p-4 px-6 rounded-xl border border-black'}>Создать страховку</button>
				</div>
			</div>
			<div className={'w-[40rem] h-[20rem] bg-red-500 rounded-2xl'} />
		</div>
	)
}
