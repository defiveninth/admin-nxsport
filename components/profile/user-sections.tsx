import { FC, useEffect, useState } from 'react'
import ProfileHeader from './profile-header'
import Link from 'next/link'
import calculateEndTime from '@/utils/calculate-end-time'
import IUserSectionsProps from '@/types/user-sections.props'

interface IUserSection {
	id: number
	user_id: number
	section_id: number
	trainer_id: number
	section_date_id: number
	type_section: number
}

const UserSections: FC<IUserSectionsProps> = ({ uuid }) => {
	const [userSections, setUserSections] = useState<IUserSection[]>([])
	const [sectionDetails, setSectionDetails] = useState<any[]>([])
	const [sectionNames, setSectionNames] = useState<{ [key: number]: string }>(
		{}
	)
	const [sectionIds, setSectionIds] = useState<number[]>([])

	useEffect(() => {
		if (uuid) {
			fetch(`http://localhost:3001/user-sections/get-sections-by-id`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ uuid }),
			})
				.then(response => response.json())
				.then((data: IUserSection[]) => {
					setUserSections(data)
					const uniqueIds = Array.from(
						new Set(data.map(section => section.section_id))
					)
					setSectionIds(uniqueIds)
				})
				.catch(error => {
					console.error('Error fetching user sections:', error)
				})
		}
	}, [uuid])

	useEffect(() => {
		if (sectionIds.length > 0) {
			fetch(`http://localhost:3001/section-dates/get-details-by-ids`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ids: sectionIds }),
			})
				.then(response => response.json())
				.then((detailsData: any[]) => {
					setSectionDetails(detailsData)
					fetch(`http://localhost:3001/sections/get-datas-by-ids`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ ids: sectionIds }),
					})
						.then(response => response.json())
						.then((sectionsData: { id: number; name: string }[]) => {
							const names = sectionsData.reduce((acc, section) => {
								acc[section.id] = section.name
								return acc
							}, {} as { [key: number]: string })
							setSectionNames(names)
						})
						.catch(error => {
							console.error('Error fetching section names by IDs:', error)
						})
				})
				.catch(error => {
					console.error('Error fetching section details by IDs:', error)
				})
		}
	}, [sectionIds])

	return (
		<>
			<ProfileHeader text='Секций пользователя' />
			{userSections.length > 0 ? (
				<ul className='flex flex-col gap-5 mt-5 mr-5'>
					{userSections.map((section: IUserSection) => (
						<li key={section.id}>
							<div className='bg-red-50 p-5 rounded-xl flex'>
								<Link
									href={`/sections/edit/${section.section_id}`}
									className='text-lg font-medium hover:underline hover:text-blue-500 mr-14'
								>
									{sectionNames[section.section_id]}:{' '}
									{section.type_section === 0 ? 'Обычный' : 'Лечебный'}
								</Link>
								{sectionDetails &&
									sectionDetails.length > 0 &&
									sectionDetails.map((detail, i) => (
										<p key={i}>
											{detail.place.name} {detail.date.name}
											{' - '}
											{detail.training_time} -{' '}
											{calculateEndTime(detail.training_time)}
											<Link href={''}>{detail.trainer_info.user_id}</Link>
										</p>
									))}
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className='text-center'>У пользователя нет никаких секций</p>
			)}
		</>
	)
}

export default UserSections
