'use client'

import { FC, useEffect, useState } from 'react'
import { GroupedData, SectionData } from '@/types/section-data'
import Link from 'next/link'
import CalendarDropdown from '@/components/calendar-dropdown'

const CalendarPage: FC = () => {
	const [data, setData] = useState<GroupedData[]>([])
	const [trainerData, setTrainerData] = useState<{
		[key: number]: { first_name: string; last_name: string }
	}>({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/section-dates/get-all`
				)

				if (!response.ok) throw new Error('Network response was not ok')

				const jsonData = await response.json()
				setData(jsonData)

				const ids = extractTrainerIds(jsonData)
				const trainers = await fetchTrainerData(ids)
				setTrainerData(trainers)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	const extractTrainerIds = (data: GroupedData[]): number[] => {
		const ids: number[] = []
		data.forEach(group => {
			group.sections.forEach((section: SectionData) => {
				if (!ids.includes(section.trainer_info.user_id)) {
					ids.push(section.trainer_info.user_id)
				}
			})
		})
		return ids
	}

	const fetchTrainerData = async (trainerIds: number[]) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/users/get-trainers-info`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ trainerIds }),
				}
			)

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			const trainerData = await response.json()

			const trainerMap: {
				[key: number]: { first_name: string; last_name: string }
			} = {}
			trainerData.forEach((trainer: any) => {
				trainerMap[trainer.id] = {
					first_name: trainer.first_name,
					last_name: trainer.last_name,
				}
			})

			return trainerMap
		} catch (error) {
			console.error('Error fetching trainer data:', error)
			return {}
		}
	}

	const handleReFetch = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/section-dates/get-all`
			)

			if (!response.ok) throw new Error('Network response was not ok')

			const jsonData = await response.json()
			setData(jsonData)

			const ids = extractTrainerIds(jsonData)
			const trainers = await fetchTrainerData(ids)
			setTrainerData(trainers)
		} catch (error) {
			console.error('Error refetching data:', error)
		}
	}

	return (
		<>
			{data.map((group: GroupedData) => (
				<div key={group.day}>
					<h3 className='text-red-500 font-semibold text-lg mt-5'>
						{group.day}:
					</h3>
					{group.sections.map((section: SectionData) => (
						<div
							key={section.id}
							className='bg-red-50 mr-5 mt-5 p-5 rounded-2xl flex'
						>
							<p className='w-[277px]'>
								{section.section_info.name}:{' '}
								{section.type === 0 ? 'Обычный' : 'Лечебный'}
							</p>
							<p>{section.training_time.split(':').slice(0, -1).join(':')}</p>
							<p className='ml-20'>
								{section.busy}/{section.quantity}
							</p>
							<Link
								className='ml-20 text-blue-400 hover:text-blue-600 hover:underline'
								href={`/coaches/${section.trainer_info.user_id}`}
							>
								{trainerData[section.trainer_info.user_id]?.first_name}{' '}
								{trainerData[section.trainer_info.user_id]?.last_name}
							</Link>
							<p className='ml-20'>{section.place.name}</p>
							<CalendarDropdown handleReFetch={handleReFetch} />
						</div>
					))}
				</div>
			))}
		</>
	)
}

export default CalendarPage
