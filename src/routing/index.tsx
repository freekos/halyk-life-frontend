import { ConsultPage } from '@/platform/pages/consult'
import { HomePage } from '@/platform/pages/home'
import { RouterProvider } from '@/shared/router'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function Routing() {
	return (
		<BrowserRouter>
			<RouterProvider>
				<Routes>
					<Route path='/' Component={HomePage} />
					<Route path='/consult' Component={ConsultPage} />
				</Routes>
			</RouterProvider>
		</BrowserRouter>
	)
}
