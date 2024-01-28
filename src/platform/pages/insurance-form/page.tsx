import { RootLayout } from '@/platform/layout'
import { Button, Field, Input } from '@/shared/ui'
import { useUnit } from 'effector-react'
import { type FormEvent, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import * as model from './model'

export const InsuranceFormPage = () => {
	const startPage = useUnit(model.pageStartEv)
	const { changeIin } = useUnit({ changeIin: model.iin.valueChangeEv })
	const [search] = useSearchParams()
	const iin = search.get('iin')

	useEffect(() => {
		if (!iin) return
		startPage({ iin })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [iin])

	console.log(iin)

	return (
		<div className={'w-screen h-screen overflow-x-hidden'}>
			<RootLayout>
				<InsuranceForm />
			</RootLayout>
		</div>
	)
}

const InsuranceForm = () => {
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

const Form = () => {
	const submit = useUnit(model.submitEv)

	const handleSubmit = (event: FormEvent) => {
		event.stopPropagation()
		submit()
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-9'>
			<fieldset className='flex flex-col gap-3'>
				<Iin />
				<Hospital />
				<Birthday />
			</fieldset>
			<Button variant='primary' type='submit'>
				Оформить
			</Button>
		</form>
	)
}

const Iin = () => {
	const { value, error, disabled, change } = useUnit({
		value: model.iin.$value,
		error: model.iin.$error,
		disabled: model.iin.$disabled,
		change: model.iin.valueChangeEv,
	})
	return (
		<Field label='ИИН' error={error}>
			<Input value={value} onChange={(event) => change(event.target.value)} disabled={disabled} error={error} />
		</Field>
	)
}

const Hospital = () => {
	const { value, error, disabled, change } = useUnit({
		value: model.hospital.$value,
		error: model.hospital.$error,
		disabled: model.hospital.$disabled,
		change: model.hospital.valueChangeEv,
	})
	return (
		<Field label='Поликлиника' error={error}>
			<Input value={value} onChange={(event) => change(event.target.value)} disabled={disabled} error={error} />
		</Field>
	)
}

const Birthday = () => {
	const { value, error, disabled, change } = useUnit({
		value: model.birthday.$value,
		error: model.birthday.$error,
		disabled: model.birthday.$disabled,
		change: model.birthday.valueChangeEv,
	})
	return (
		<Field label='Дата рождения' error={error}>
			<Input
				value={value}
				onChange={(event) => change(event.target.value)}
				disabled={disabled}
				error={error}
				type={'date'}
			/>
		</Field>
	)
}
