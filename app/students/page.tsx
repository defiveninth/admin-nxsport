import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import StudentsPage from '@/screens/students'
import IRoute from '@/types/route'
import { GraduationCap } from 'lucide-react'
import type { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Студенты',
}

const route: Array<IRoute> = [
	{
		icon: GraduationCap,
		route: 'Студенты',
		url: '/students',
	},
]

const Students: FC = () => {
	return (
		<>
			<Nav now='students' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<StudentsPage />
			</main>
		</>
	)
}

export default Students
