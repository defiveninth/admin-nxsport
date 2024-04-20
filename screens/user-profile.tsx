'use client'

import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BadgeCheck, CircleUserRound, GraduationCap } from 'lucide-react'
import CurrentRoute from '@/components/current-route'
import User from '@/types/user'
import IRoute from '@/types/route'

const UserProfilePage: FC<{ id: string }> = ({ id }) => {
	const [userData, setUserData] = useState<User>()
	const router = useRouter()

	const formatAlmatyDate = (dateString: Date | string | undefined): string => {
		if (!dateString) return ''
	
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
	
		return `${day}-${month}.${year} ${hours}:${minutes}`
	}

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(
					'http://localhost:3001/users/get-user-data',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ id: id }),
					}
				)

				if (!response.ok) {
					const errorData = await response.json()
					if (
						response.status === 404 &&
						errorData.message === 'Юзер не найден'
					) {
						router.push('/users')
					} else {
						throw new Error('Failed to fetch user data')
					}
				}

				const userData = await response.json()
				setUserData({ ...userData,  })
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		fetchUserData()
	}, [id, router])

	const route: Array<IRoute> = [
		{
			icon: GraduationCap,
			route: 'Студенты',
			url: '/students',
		},
		{
			icon: CircleUserRound,
			route: `${userData?.first_name} ${userData?.last_name}`,
			url: `/users/${id}`,
		},
	]

	return (
		<>
			<CurrentRoute route={route} />
			<div className='bg-red-50 mr-5 p-5 rounded-2xl flex items-center gap-10'>
				<img
					src={userData?.profile_photo}
					alt='userphoto'
					className='w-48 h-48 rounded-full p-1'
					style={{
						border:
							userData?.verify === 0 ? 'solid 4px red' : 'solid 4px green',
					}}
				/>
				<div className='flex flex-col gap-1'>
					<h2 className='text-3xl font-semibold flex items-center gap-2'>
              <span>{userData?.first_name} {userData?.last_name}</span>
							{ userData?.verify === 1 && <BadgeCheck width={24} height={24} className='text-blue-700' />  }
					</h2>
					<span>{userData?.birth_date.split('-').reverse().join('-')}</span>
					<Link
						href={`https://wa.me/${userData?.phone_number.replace(
							/\s|\(|\)/g,
							''
						)}`}
						target='_blank'
						className='link link-primary'
					>
						{userData?.phone_number}
					</Link>
					<Link
						href={`mailto:${userData?.email}`}
						className='link link-primary'
						target='_blank'
					>
						{userData?.email}
					</Link>
					<h2>Дата регистраций: {formatAlmatyDate(userData?.registration_date)}</h2>
				</div>
			</div>
			<pre>{JSON.stringify(userData, null, 2)}</pre>
		</>
	)
}

export default UserProfilePage
