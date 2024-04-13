import { FC } from 'react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Студенты',
}

const Students: FC = () => {
	return (
		<>
			<Nav now='students' />
			<main className='ml-[320px]'>students</main>
		</>
	)
}

export default Students
