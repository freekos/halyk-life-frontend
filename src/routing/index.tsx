import { AdminPage } from '@/admin'
import { ConsultPage } from '@/platform/pages/consult'
import { HomePage } from '@/platform/pages/home'
import { InsuranceFormPage } from '@/platform/pages/insurance-form'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function Routing() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' Component={HomePage} />
				<Route path='/consult' Component={ConsultPage} />
				<Route path='/admin' Component={AdminPage} />
				<Route path='/form/:id' Component={InsuranceFormPage} />
			</Routes>
		</BrowserRouter>
	)
}
