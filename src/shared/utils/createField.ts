import { createFactory } from '@withease/factories'
import { attach, createEvent, createStore } from 'effector'

interface CreateFieldOptions<T> {
	initial: T
	rules: { validate: (value: T) => boolean; message: string }[]
}

export const createField = createFactory(<T>({ initial, rules }: CreateFieldOptions<T>) => {
	const valueChangeEv = createEvent<T>()
	const disableChangeEv = createEvent<boolean>()

	const $value = createStore<T>(initial)
	const $error = createStore<string | null>(null)
	const $disabled = createStore<boolean>(false)

	const findErrorFx = attach({
		source: $value,
		effect: (value) => {
			const rule = rules.find((rule) => !rule.validate(value))
			return rule ? rule.message : null
		},
	})

	$value.on(valueChangeEv, (_, newValue) => newValue)
	$disabled.on(disableChangeEv, (_, disabled) => disabled)
	$error.on(findErrorFx.doneData, (_, newError) => newError)

	return { $value, $error, $disabled, valueChangeEv, disableChangeEv, findErrorFx }
})
