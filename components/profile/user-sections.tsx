import { FC, useEffect, useState } from 'react'
import ProfileHeader from './profile-header'
import Link from 'next/link'

interface IUserSection {
	id: number
	user_id: number
	section_id: number
	trainer_id: number
	section_date_id: number
	type_section: number
}

interface IUserSectionsProps {
	uuid?: number
}

const UserSections: FC<IUserSectionsProps> = ({ uuid }) => {
	const [userSections, setUserSections] = useState<IUserSection[]>([])
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
					fetch(`http://localhost:3001/sections/get-datas-by-ids`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ ids: uniqueIds }),
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
							console.error('Error fetching section data by IDs:', error)
						})
				})
				.catch(error => {
					console.error('Error fetching user sections:', error)
				})
		}
	}, [uuid])

	return (
		<>
			<ProfileHeader text='Секций пользователя' />
			{userSections.length > 0 ? (
				<ul className='flex flex-col gap-5 mt-5 mr-5'>
					{userSections.map((section: IUserSection) => (
						<li key={section.id}>
							<div className='bg-red-50 p-5 rounded-xl'>
								<Link
									href={`/sections/edit/${section.section_id}`}
									className='text-lg font-medium hover:underline hover:text-blue-500'
								>
									{sectionNames[section.section_id]}:{' '}
									{section.type_section === 0 ? 'Обычный' : 'Лечебный'}
								</Link>
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
