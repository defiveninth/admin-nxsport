'use client'

import { FC, useEffect, useState } from 'react'
import Trainer from '@/types/trainer'
import User from '@/types/user'

const CoachesPage: FC = () => {
	const [trainers, setTrainers] = useState<Array<Trainer>>()
	const [trainerInfo, setTrainerInfo] = useState<Array<User>>()
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3001/trainers/get-all')
				if (!response.ok) {
					throw new Error('Failed to fetch data')
				}
				const data: Trainer[] = await response.json()
				setTrainers(data)

				const trainerIds = data.map(trainer => trainer.user_id)
				const infoResponse = await fetch(
					'http://localhost:3001/users/get-trainers-info',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ trainerIds }),
					}
				)
				if (!infoResponse.ok) {
					throw new Error('Failed to fetch trainer info')
				}
				const trainerInfoData: Array<User> = await infoResponse.json()
				setTrainerInfo(trainerInfoData)
			} catch (error) {
				console.error('Error fetching data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	return (
		<>
			{isLoading ? (
				<div className='flex justify-center min-h-96'>
					<span className='loading loading-spinner text-error'></span>
				</div>
			) : (
				trainers &&
				trainerInfo && (
					<>
						{trainers.map(trainer => {
							const info = trainerInfo.find(info => info.id === trainer.user_id)
							return (
								<div key={trainer.id} className='bg-red-50 p-5 rounded-2xl mr5'>
									{info && `${info.first_name} ${info.last_name}`}
								</div>
							)
						})}
					</>
				)
			)}
		</>
	)
}

export default CoachesPage
