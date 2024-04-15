'use client'

import React, { FC, useState, useEffect } from 'react'
import AdminInput from './admin-input'
import IUserData from '@/types/user-data'
import checkToken from '@/actions/check-token'
import AdminCard from './admin-card'

const AdminPage: FC = () => {
	const [query, setQuery] = useState<string>('')
	const [admins, setAdmins] = useState<Array<IUserData>>([])

	const fetchAdmins = async () => {
		const T = await checkToken()
		try {
			const response = await fetch('http://localhost:3001/auth/get-admins', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token: T }),
			})

			if (!response.ok) {
				throw new Error('Failed to fetch admins')
			}

			const data = await response.json()
			setAdmins(data)
		} catch (error) {
			console.error('Error fetching admins:', error)
		}
	}

	useEffect(() => {
		fetchAdmins()
	}, [])

	return (
		<>
			<AdminInput query={query} setQuery={setQuery} />
			{admins.length !== 0 ? (
				admins.map(admin => (
					<AdminCard
						key={admin.id}
						id={admin.id}
						name={admin.name}
						surname={admin.surname}
						username={admin.username}
						isSuperUser={admin.isSuperUser}
					/>
				))
			) : (
				<p>Здесь нету админов</p>
			)}
		</>
	)
}

export default AdminPage
