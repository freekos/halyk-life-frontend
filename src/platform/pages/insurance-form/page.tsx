import { RootLayout } from '@/platform/layout'
import { InsuranceForm } from '@/platform/pages/home/components/InsuranceForm.tsx'
import { useUnit } from 'effector-react'
import { useParams } from 'react-router'

import * as model from '../home/components/InsuranceForm/model.ts'

export const InsuranceFormPage = () => {
	const { iin } = useParams()
	const iinFromModel = useUnit(model.iin)
	if (iin != '0') {
		//TODO
		// iinFromModel.$value=iin
		// iinFromModel.$disabled=true
	}
	return (
		<div className={'w-screen h-screen overflow-x-hidden'}>
			<RootLayout>
				<InsuranceForm />
			</RootLayout>
		</div>
	)
}
