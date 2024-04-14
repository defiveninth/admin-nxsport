import { FC } from 'react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'
import CurrentRoute from '@/components/current-route'
import IRoute from '@/types/route'
import { BookA } from 'lucide-react'

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
			</main>
		</>
	)
}

export default Controll
