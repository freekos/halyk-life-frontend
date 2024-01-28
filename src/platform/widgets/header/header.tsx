import { Logo } from '@/shared/assets/icons'
import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
	return (
		<div className={'w-full h-20 flex items-center bg-[#EDEDED]'}>
			<Logo />
			<div>
				<Link to='' />
				<Link to='' />
			</div>
		</div>
	)
}
