'use client'

import { FC, useEffect, useState } from 'react'
import { GroupedData, SectionData } from '@/types/section-data'

const CalendarPage: FC = () => {
	const [data, setData] = useState<GroupedData[]>([])
	const [trainerIds, setTrainerIds] = useState<number[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'http://localhost:3001/section-dates/get-all'
				)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const jsonData = await response.json()
				setData(jsonData)

				const ids = extractTrainerIds(jsonData)
				setTrainerIds(ids)
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
								{section.type === 0 ? 'Обычный' : 'Больной'}
							</p>
							<p>{section.training_time.split(':').slice(0, -1).join(':')}</p>
							<p className='ml-20'>
								{section.busy}/{section.quantity}
							</p>
							<p className='ml-20'>{section.place.name}</p>
						</div>
					))}
				</div>
			))}
		</>
	)
}

export default CalendarPage
