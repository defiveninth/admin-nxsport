import { FC } from 'react'
import type { Metadata } from 'next'
import { BookA, CirclePlus } from 'lucide-react'
import SectionsCreatePage from '@/screens/sections-create'
import Nav from '@/components/nav'
import CurrentRoute from '@/components/current-route'
import IRoute from '@/types/route'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Создать Секцию',
}

const route: Array<IRoute> = [
	{
		icon: BookA,
		route: 'Секций',
		url: '/sections'
	},
	{
		icon: CirclePlus,
		route: 'Создать',
		url: '/sections/create'
	},
]

const SectionEdit: FC = () => {
	return (
		<>
			<Nav now='sections' />
			<main className='ml-[320px]'>
				<CurrentRoute route={ route } />
				<SectionsCreatePage />
			</main>
		</>
	)
}

export default SectionEdit
