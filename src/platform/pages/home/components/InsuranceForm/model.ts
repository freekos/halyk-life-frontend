import { createField } from '@/shared/utils'
import { invoke } from '@withease/factories'
import { createEvent } from 'effector'

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
	}),
)

export const birthday = invoke(() =>
	createField({
		initial: '',
		rules: [],
	}),
)
