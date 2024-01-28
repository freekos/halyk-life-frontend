import { instance } from '@/shared/api'
import { createField } from '@/shared/utils'
import { invoke } from '@withease/factories'
import { createEffect, createEvent, sample } from 'effector'
import { and, not } from 'patronum'

export const pageStartEv = createEvent<{ iin: string }>()
export const submitEv = createEvent()

export const iin = invoke(() =>
	createField({
		initial: '',
		rules: [],
	}),
)
export const hospital = invoke(() =>
	createField({
		initial: '',
		rules: [],
		disabled: true,
	}),
)

export const birthday = invoke(() =>
	createField({
		initial: '',
		rules: [],
		disabled: true,
	}),
)

const getUserInfoFx = createEffect((iin: string) => instance.get(`/person/${iin}`))
const submitFx = createEffect((iin: string) =>
	instance({
		method: 'PUT',
		url: '/update_status',
		params: {
			iin,
			status: 'waiting',
		},
	}),
)

sample({
	clock: pageStartEv,
	fn: ({ iin }) => iin,
	target: [getUserInfoFx, iin.$value],
})

hospital.$value.on(getUserInfoFx.doneData, (_, { data }) => data.person.org)
hospital.$disabled.on(getUserInfoFx.finally, () => false)
birthday.$value.on(getUserInfoFx.doneData, (_, { data }) => data.person.birthDate)
birthday.$disabled.on(getUserInfoFx.doneData, () => false)

sample({
	clock: submitEv,
	target: [iin.findErrorFx, hospital.findErrorFx, birthday.findErrorFx],
})

sample({
	clock: [iin.findErrorFx.done, hospital.findErrorFx.done, birthday.findErrorFx.done],
	filter: and(
		iin.$error.map((error) => !error),
		not(iin.findErrorFx.pending),
		hospital.$error.map((error) => !error),
		not(hospital.findErrorFx.pending),
		birthday.$error.map((error) => !error),
		not(birthday.findErrorFx.pending),
	),
	target: submitFx as any,
})
