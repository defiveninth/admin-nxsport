'use client'

import { FC, useEffect, useState } from 'react'
import CurrentRoute from '@/components/current-route'
import UserContact from '@/components/profile/user-contact'
import IRoute from '@/types/route'
import User from '@/types/user'
import { CircleUserRound, GraduationCap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ProfileCard from '@/components/profile/profile-card'
import UserSections from '@/components/profile/user-sections'
import UserActions from '@/components/profile/user-actions'

interface IUserProfilePageProps {
	id: string
}

const UserProfilePage: FC<IUserProfilePageProps> = ({ id }) => {
	const [userData, setUserData] = useState<User>()
	const router = useRouter()

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/users/get-user-data`,
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
						router.push('/not-found')
					} else {
						throw new Error('Failed to fetch user data')
					}
				}

				const userData = await response.json()
				setUserData({ ...userData })
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		fetchUserData()
	}, [id, router])

	const route: Array<IRoute> = [
		{
			icon: GraduationCap,
			route: userData?.role === 1 ? 'Студенты' : 'Трейнеры',
			url: '/students',
		},
		{
			icon: CircleUserRound,
			route: `${userData?.first_name} ${userData?.last_name}`,
			url: `/users/${id}`,
		},
	]

	useEffect(() => {
		document.title = `Нархоз Спорт | Профиль ${userData?.first_name} ${userData?.last_name}`
	}, [userData])

	return (
		<>
			<CurrentRoute route={route} />
			<ProfileCard userData={userData} />
			<UserContact userData={userData} />
			{userData?.role === 1 && <UserSections uuid={userData?.id} />}
			<UserActions
				id={userData?.id!}
			/>
		</>
	)
}

export default UserProfilePage
