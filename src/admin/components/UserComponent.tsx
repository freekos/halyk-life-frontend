// eslint-disable-next-line react/prop-types
import type { User } from '@/admin/components/user/model.ts'
import { FILTER } from '@/admin/components/user/model.ts'
import React from 'react'

export const UserComponent: React.FC<User> = ({ name, hospital, insuranceType, birthday, address }) => {
	let insuranceTypeStyle = ''
	switch (insuranceType) {
		case FILTER.ACCEPTED:
			insuranceTypeStyle = 'text-primary'
			break
		case FILTER.PENDING:
			insuranceTypeStyle = 'text-inherit'
			break
		case FILTER.REJECTED:
			insuranceTypeStyle = 'text-red-500'
			break
	}
	return (
		<div className={'w-[500px] bg-white flex items-center gap-10 p-20 rounded-2xl border border-black'}>
			<div>
				<div className={'w-fit text-sm px-5 py-2 flex border border-black rounded-3xl mb-2'}>{name}</div>
				<h2 className={'text-lg font-bold'}>Поликлиника: {hospital}</h2>
				<p className={'text-sm'}>Дата рождения: {birthday}</p>
				<p className={'text-sm'}>Адрес: {address}</p>
				<p className={'text-sm'}>
					Застрахован: <span className={`${insuranceTypeStyle} font-bold`}>{insuranceType}</span>
				</p>
			</div>
		</div>
	)
}
