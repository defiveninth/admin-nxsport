'use client'

import { FC, useEffect, useState } from 'react'
import { GroupedData, SectionData } from '@/types/section-data'
import Link from 'next/link'
import CalendarDropdown from '@/components/calendar-dropdown'
import SearchBar from '@/components/calendar-search-bar'

const CalendarPage: FC = () => {
	const [data, setData] = useState<GroupedData[]>([])
	const [filteredData, setFilteredData] = useState<GroupedData[]>([])
	const [trainerData, setTrainerData] = useState<{
		[key: number]: { first_name: string; last_name: string }
	}>({})
	const [loading, setLoading] = useState(true)
	const [searchText, setSearchText] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/section-dates/get-all`
				)

				if (!response.ok) throw new Error('Network response was not ok')

				const jsonData = await response.json()

				if (jsonData.length === 0) {
					setLoading(false)
				} else {
					setData(jsonData)
					setLoading(false) // Set loading to false once data is fetched

					const ids = extractTrainerIds(jsonData)
					const trainers = await fetchTrainerData(ids)
					setTrainerData(trainers)
				}
			} catch (error) {
				console.error('Error fetching data:', error)
				setLoading(false) // Set loading to false in case of error
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
			if (trainerIds.length === 0) {
				throw new Error('trainerIds array is empty')
			}

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

	useEffect(() => {
		const filtered = data.filter(group =>
			group.sections.some(section =>
				`${section.section_info.name} ${section.place.name}`
					.toLowerCase()
					.includes(searchText.toLowerCase())
			)
		)
		setFilteredData(filtered)
	}, [searchText, data])

	return (
		<>
			<SearchBar onSearch={setSearchText} value={searchText} />

			{loading ? (
				<div>Loading...</div>
			) : filteredData.length === 0 ? (
				<div className='text-center bg-red-50 mr-5 p-5 rounded-2xl mt-5'>
					No available sections.
				</div>
			) : (
				filteredData.map((group: GroupedData) => (
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
								<Link href={`/coaches/${section.trainer_info.user_id}`} className='ml-20 text-blue-400 hover:text-blue-600 hover:underline'>
										{trainerData[section.trainer_info.user_id]?.first_name}{' '}
										{trainerData[section.trainer_info.user_id]?.last_name}
								</Link>
								<p className='ml-20'>{section.place.name}</p>
								<CalendarDropdown handleReFetch={() => {}} />
							</div>
						))}
					</div>
				))
			)}
		</>
	)
}

export default CalendarPage
