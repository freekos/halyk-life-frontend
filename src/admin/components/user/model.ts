import axios from 'axios'
import { createEffect, createStore } from 'effector'

const BASE_URL = 'https://ba64-2-72-62-84.ngrok-free.app'

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

export const getUserFx = createEffect()
getUserFx.use(async (params) => {
	const req = await axios.get(`${BASE_URL}/person/${params}`)
	// const user:User={name:req.data}
	// return req
	console.log(req)
})
getUserFx.done.watch(console.log)
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
}).on(getUserFx.doneData, (store, data) => {
	return { ...store }
})
