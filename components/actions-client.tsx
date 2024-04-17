'use client'

import { FC, useState, useEffect } from 'react'
import ActionsInput from './actions-input'
import ActionsFilter from './actions-filter'
import Action from '@/types/action'
import formatAlmatyDate from '@/actions/format-almaty-date'

const ActionsPage: FC = () => {
	const [actions, setActions] = useState<Action[]>([])
	const [query, setQuery] = useState<string>('')
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
	const [filteredActions, setFilteredActions] = useState<Action[]>([])

	useEffect(() => {
		const fetchActions = async () => {
			try {
				const response = await fetch('http://localhost:3001/actions/get-all', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				if (!response.ok) {
					throw new Error('Failed to fetch actions')
				}
				const data = await response.json()
				setActions(
					data.map((item: any) => ({
						id: item.actions_id,
						action: item.actions_action,
						date: new Date(item.actions_date),
						userName: item.user_name,
						userSurname: item.user_surname,
						userId: item.user_id,
					}))
				)
			} catch (error) {
				console.error('Error fetching actions:', error)
			}
		}

		fetchActions()
	}, [])

	useEffect(() => {
		if (query.trim() !== '') {
			const filtered = actions.filter(
				action =>
					action.id.toString().includes(query) ||
					action.userId.toString().includes(query) ||
					action.userName.toLowerCase().includes(query.toLowerCase()) ||
					action.userSurname.toLowerCase().includes(query.toLowerCase()) ||
					action.action.toLowerCase().includes(query.toLowerCase())
			)
			setFilteredActions(filtered)
		} else {
			setFilteredActions(actions)
		}
	}, [query, actions])

	return (
		<>
			<ActionsInput
				query={query}
				setQuery={setQuery}
				isFilterOpen={isFilterOpen}
				setIsFilterOpen={setIsFilterOpen}
			/>
			{isFilterOpen && <ActionsFilter />}
			{filteredActions.map(action => (
				<div
					key={action.id}
					className='bg-red-50 mt-5 mr-5 p-5 rounded-2xl flex gap-4'
				>
					<button
						className='font-medium'
						onClick={() => setQuery(String(action.userId))}
					>
						{action.userSurname} {action.userName}
					</button>
					<p>{action.action}</p>
					<p>Date: {formatAlmatyDate(action.date)}</p>
				</div>
			))}
		</>
	)
}

export default ActionsPage
