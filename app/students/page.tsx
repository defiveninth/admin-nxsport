import { FC } from 'react'
import type { Metadata } from 'next'
import { GraduationCap } from 'lucide-react'
import Nav from '@/components/nav'
import CurrentRoute from '@/components/current-route'
import StudentsPage from '@/components/students-client'
import IRoute from '@/types/route'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Студенты',
}

const route: Array<IRoute> = [
	{
		icon: GraduationCap,
		route: 'Студенты',
		url: '/students'
	},
]

const Students: FC = () => {
	return (
		<>
			<Nav now='students' />
			<main className='ml-[320px]'>
				<CurrentRoute route={ route } />
				<StudentsPage />
			</main>
		</>
	)
}

export default Students
