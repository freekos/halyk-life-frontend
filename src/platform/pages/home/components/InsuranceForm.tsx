import { Form } from '@/platform/pages/home/components/InsuranceForm/Form.tsx'

export const InsuranceForm = () => {
	return (
		<div
			id={'insurance-form'}
			className={'w-full h-screen flex flex-col justify-between items-center py-32 bg-[#313338]'}
		>
			<h1 className={'text-3xl font-bold text-primary'}>Создать страховку</h1>
			<div className={'w-1/2'}>
				<Form />
			</div>
		</div>
	)
}
