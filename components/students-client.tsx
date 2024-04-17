'use client'

import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { GraduationCap, SendHorizontal, Mail } from 'lucide-react'

export interface Role {
	id: number
	name: string
}

export interface User {
	id: number
	first_name: string
	last_name: string
	birth_date: string
	phone_number: string
	email: string
	registration_date: string
	profile_photo: string
	verify: number
	type_section: number
	role: number
	visits: number
}

const StudentsPage: FC = () => {
	const [roles, setRoles] = useState<Role[]>([])
	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		const fetchRolesAndUsers = async () => {
			try {
				const rolesResponse = await fetch('http://localhost:3001/roles/get-all')
				if (!rolesResponse.ok) throw new Error('Failed to fetch roles')
				const rolesData = await rolesResponse.json()
				setRoles(rolesData)

				const usersResponse = await fetch('http://localhost:3001/users/get-all')
				if (!usersResponse.ok) throw new Error('Failed to fetch users')
				const usersData = await usersResponse.json()

				const updatedUsers = usersData.map((user: User) => ({
					...user,
					role: roles.find(role => role.id === user.role) || user.role,
				}))

				setUsers(updatedUsers)
			} catch (error) {
				console.error('Error fetching roles or users:', error)
			}
		}

		fetchRolesAndUsers()
	}, [])

	return (
		<>
			<h2>Студенты</h2>
			<div>
				{users
					.filter(user => {
						const roleName = roles.find(role => role.id === user.role)?.name
						return roleName === 'Student'
					})
					.map(user => (
						<div
							key={user.id}
							className='bg-red-50 mr-5 mt-5 p-5 rounded-2xl flex gap-5'
						>
							<p className='min-w-64 flex gap-5'>
								<GraduationCap /> {user.first_name} {user.last_name}
							</p>
							<Link
								href={`https://wa.me/${user.phone_number.replace(
									/\s|\(|\)/g,
									''
								)}`}
								target='_blank'
								className='mr-20 text-blue-500 font-medium flex gap-2 items-center hover:underline'
							>
								{user.phone_number}
								<SendHorizontal width={20} height={20} />
							</Link>
							<Link
								href={`mailto:${user.email}`}
								target='_blank'
								className='text-blue-500 font-medium flex gap-2 items-center hover:underline'
							>
								{user.email}
								<Mail width={20} height={20} />
							</Link>
							<p
								className={`ml-auto font-medium ${
									user.visits >= 20 ? 'text-red-500' : 'text-green-500'
								}`}
							>
								Visits: {user.visits}
							</p>
						</div>
					))}
			</div>
		</>
	)
}

export default StudentsPage
