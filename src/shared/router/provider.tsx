import { useUnit } from 'effector-react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import * as model from './model'

interface RouterProviderProps {
	children: ReactNode
}

export function RouterProvider({ children }: RouterProviderProps) {
	const [changeNavigate, changeLocation] = useUnit([model.navigateChangeEv, model.locationChangeEv])
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		changeNavigate(navigate)
	}, [navigate])

	useEffect(() => {
		changeLocation(location)
	}, [location])

	return <>{children}</>
}
