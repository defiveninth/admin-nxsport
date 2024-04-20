import { FC } from 'react'
import type { Metadata } from 'next'
import { BookA } from 'lucide-react'
import Nav from '@/components/nav'
import CurrentRoute from '@/components/current-route'
import SectionsPage from '@/screens/sections'
import IRoute from '@/types/route'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Секций',
}

const route: Array<IRoute> = [
	{
		icon: BookA,
		route: 'Секций',
		url: '/sections'
	},
]

const Controll: FC = () => {
	return (
		<>
			<Nav now='sections' />
			<main className='ml-[320px]'>
				<CurrentRoute route={ route } />
				<SectionsPage />
			</main>
		</>
	)
}

export default Controll
