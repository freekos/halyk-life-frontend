import { AdminPage } from '@/admin'
import { ConsultPage } from '@/platform/pages/consult'
import { HomePage } from '@/platform/pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function Routing() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/:iin' Component={HomePage} />
				<Route path='/consult' Component={ConsultPage} />
				<Route path='/admin' Component={AdminPage} />
			</Routes>
		</BrowserRouter>
	)
}
