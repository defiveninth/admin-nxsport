'use client'

import checkToken from '@/actions/check-token'
import S from '@/styles/admin-list.module.css'
import IUserData from '@/types/user-data'
import { FC, useEffect, useState } from 'react'
import AdminCard from '../components/admin-card'
import AdminInput from '../components/admin-input'

const AdminsPage: FC = () => {
	const [query, setQuery] = useState<string>('')
	const [admins, setAdmins] = useState<Array<IUserData>>([])
	const [error, setError] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchAdmins = async () => {
		const T = await checkToken()
		try {
			const response = await fetch('https://myapi.kz/auth/get-admins', {
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

export default AdminsPage
