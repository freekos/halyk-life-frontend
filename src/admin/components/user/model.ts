import axios from 'axios'
import { createEffect, createStore } from 'effector'

const BASE_URL = 'http://0.tcp.in.ngrok.io:11408'

export interface User {
	name: string
	address: string
	hospital: string
	insuranceType: FILTER
	birthday: string
}

export enum FILTER {
	ACCEPTED = 'accepted',
	REJECTED = 'rejected',
	PENDING = 'pending',
}

interface UsersStore {
	users: User[]
}

const formatDate = (date: string) => {
	const regex = /^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}$/
	const match = date.match(regex)!
	return match[3] + '-' + match[2] + '-' + match[1]
}
export const getUserFx = createEffect()
export const getUsersFx = createEffect<void, any>()
getUserFx.use(async (params) => {
	const req = await axios.get(`${BASE_URL}/person/${params}`)
	// const user:User={name:req.data}
	console.log(req.data)
	return req
})

getUsersFx.use(async () => {
	const req = await axios.get(`${BASE_URL}/get_users`)
	return req.data
})
export const $users = createStore<UsersStore>({
	users: [
		{
			name: 'Иван',
			address: 'ул. Примерная, 123',
			hospital: 'Городская больница №1',
			insuranceType: FILTER.ACCEPTED,
			birthday: '01.01.1990',
		},
		{
			name: 'Мария',
			address: 'ул. Образцовая, 456',
			hospital: 'Региональная больница',
			insuranceType: FILTER.REJECTED,
			birthday: '15.03.1985',
		},
		{
			name: 'Петр',
			address: 'ул. Тестовая, 789',
			hospital: 'Частная клиника',
			insuranceType: FILTER.PENDING,
			birthday: '20.11.2000',
		},
	],
})
	.on(getUserFx.doneData, (store, data) => {
		const dataObj = (data as any).data
		const formattedDate = formatDate(dataObj.person.birthDate)
		const newUser: User = {
			name: `${dataObj.person.firstName} ${dataObj.person.lastName} ${dataObj.person.secondName}`,
			birthday: formattedDate,
			hospital: dataObj.person.org,
			address: dataObj.person.address,
			insuranceType: FILTER.PENDING,
		}
		return { ...store, users: [...store.users, newUser] }
	})
	.on(getUsersFx.doneData, (store, data) => {
		const newData = data.map((el: any) => ({
			name: `${el.user_data.firstName} ${el.user_data.lastName} ${el.user_data.secondName}`,
			birthday: formatDate(el.user_data.birthDate),
			hospital: el.user_data.org,
			address: el.user_data.address,
			insuranceType: el.status === 'waiting' ? FILTER.PENDING : el.status,
		}))
		return { ...store, users: newData }
	})
