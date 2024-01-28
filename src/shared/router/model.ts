import { attach, createEvent, createStore } from 'effector'
import type { Location, NavigateFunction } from 'react-router'

export const navigateChangeEv = createEvent<NavigateFunction>()
export const locationChangeEv = createEvent<Location>()

const $navigate = createStore<NavigateFunction | null>(null)
const $location = createStore<Location | null>(null)

export const navigateToFx = attach({
	source: $navigate,
	effect: (navigate, { pathname, search }: { pathname?: string; search?: string; hash?: string }) => {
		if (!navigate) throw new Error('navigate is null')
		navigate({ pathname, search, hash: '' })
	},
})

$navigate.on(navigateChangeEv, (_, newNavigate) => newNavigate)
$location.on(locationChangeEv, (_, newLocation) => newLocation)
