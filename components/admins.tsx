'use client'

import React, { FC, useState, useEffect } from 'react'
import AdminInput from './admin-input'
import AdminCard from './admin-card'
import checkToken from '@/actions/check-token'
import IUserData from '@/types/user-data'
import S from '@/styles/admin-list.module.css'

const AdminPage: FC = () => {
	const [query, setQuery] = useState<string>('')
	const [admins, setAdmins] = useState<Array<IUserData>>([])
	const [error, setError] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(true)

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

			if (!response.ok) setError('Failed to fetch admins')

			const data = await response.json()
			setAdmins(data)
		} catch (error) {
			setError('Error fetching admins: ' + error)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		fetchAdmins()
	}, [])

	const filteredAdmins = admins.filter(
		admin =>
			admin.id.toString().includes(query) ||
			admin.name.toLowerCase().includes(query.toLowerCase()) ||
			admin.surname.toLowerCase().includes(query.toLowerCase()) ||
			admin.username.toLowerCase().includes(query.toLowerCase())
	)

	return (
		<>
			<AdminInput query={query} setQuery={setQuery} />
			{isLoading ? (
				<div className={S.loadWrapper}>
					<span></span>
				</div>
			) : filteredAdmins.length !== 0 ? (
				filteredAdmins.map(admin => (
					<AdminCard
						key={admin.id}
						id={admin.id}
						name={admin.name}
						surname={admin.surname}
						username={admin.username}
						isSuperUser={admin.isSuperUser}
					/>
				))
			) : error ? (
				error
			) : (
				<p>Здесь нет админов</p>
			)}
		</>
	)
}

export default AdminPage
