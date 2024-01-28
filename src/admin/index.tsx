import { $users, FILTER, getUserFx, getUsersFx } from '@/admin/components/user/model.ts'
import { UserComponent } from '@/admin/components/UserComponent.tsx'
import { Logo } from '@/shared/assets/icons'
import { Button } from '@/shared/ui'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'

export const AdminPage = () => {
	const userStore = useUnit($users)
	const [filter, setFilter] = useState<FILTER | 'all'>('all')
	let filteredUsers = userStore.users
	if (filter === FILTER.ACCEPTED) {
		filteredUsers = userStore.users.filter((el) => el.insuranceType === FILTER.ACCEPTED)
	}
	if (filter === FILTER.REJECTED) {
		filteredUsers = userStore.users.filter((el) => el.insuranceType === FILTER.REJECTED)
	}
	if (filter === FILTER.PENDING) {
		filteredUsers = userStore.users.filter((el) => el.insuranceType === FILTER.PENDING)
	}
	useEffect(() => {
		getUsersFx()
		setInterval(() => {
			getUsersFx()
		}, 5000)
	}, [])
	return (
		<div className={'w-screen h-screen overflow-x-hidden'}>
			<div className={'w-full fixed h-20 z-30 flex justify-between items-center p-6 bg-[#EDEDED]'}>
				<Logo />
				<div className={'flex items-center gap-5'}>
					<div className={'flex gap-5'}>
						<Button
							variant={filter === FILTER.ACCEPTED ? 'primary' : 'gray'}
							onClick={() => {
								setFilter(FILTER.ACCEPTED)
							}}
						>
							Accepted Insuranses
						</Button>
						<Button
							variant={filter === FILTER.REJECTED ? 'primary' : 'gray'}
							onClick={() => {
								setFilter(FILTER.REJECTED)
							}}
						>
							Rejected Insuranses
						</Button>
						<Button
							variant={filter === FILTER.PENDING ? 'primary' : 'gray'}
							onClick={() => {
								setFilter(FILTER.PENDING)
							}}
						>
							Pending Insuranses
						</Button>
						<Button
							variant={filter === 'all' ? 'primary' : 'gray'}
							onClick={() => {
								setFilter('all')
							}}
						>
							All Insuranses
						</Button>
					</div>
				</div>
			</div>
			<div className={'flex flex-col w-full gap-10 justify-evenly items-center bg-inherit'}>
				<h1 className={'text-3xl font-bold mt-32'}>Страховки</h1>
				<div className={'flex flex-wrap justify-center gap-5'}>
					{filteredUsers.map((el) => (
						<UserComponent
							key={el.name}
							name={el.name}
							address={el.address}
							hospital={el.hospital}
							insuranceType={el.insuranceType}
							birthday={el.birthday}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
