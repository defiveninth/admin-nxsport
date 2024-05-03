'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import Trainer from '@/types/trainer'
import User from '@/types/user'
import { Mail, SendHorizontal } from 'lucide-react'

const CoachesPage: FC = () => {
	const [trainers, setTrainers] = useState<Array<Trainer>>()
	const [trainerInfo, setTrainerInfo] = useState<Array<User>>()
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trainers/get-all`)
				if (!response.ok) {
					throw new Error('Failed to fetch data')
				}
				const data: Trainer[] = await response.json()
				setTrainers(data)

				const trainerIds = data.map(trainer => trainer.user_id)
				const infoResponse = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/users/get-trainers-info`,
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
								<div
									key={trainer.id}
									className='bg-red-50 p-5 rounded-2xl items-center mr-5 min-w-64 flex gap-5'
								>
									<img
										src={info?.profile_photo}
										alt={info?.first_name}
										width={50}
										height={50}
										className='mr-5 rounded-full'
									/>
									<Link href={`/coaches/${info?.id}`}>
										{info?.first_name} {info?.last_name}: {info?.type_section === 0 ? 'Обычный' : 'Лечебный'}
									</Link>
									<Link
										href={`https://wa.me/${info?.phone_number.replace(
											/\s|\(|\)/g,
											''
										)}`}
										target='_blank'
										className='mr-20 text-blue-500 font-medium flex gap-2 items-center hover:underline'
									>
										{info?.phone_number}
										<SendHorizontal width={20} height={20} />
									</Link>
									<Link
										href={`mailto:${info?.email}`}
										target='_blank'
										className='text-blue-500 font-medium flex gap-2 items-center hover:underline'
									>
										{info?.email}
										<Mail width={20} height={20} />
									</Link>
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
