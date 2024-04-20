import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav/nav'
import SectionsCreatePage from '@/screens/sections-create'
import IRoute from '@/types/route'
import { BookA, CirclePlus } from 'lucide-react'
import type { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Создать Секцию',
}

const route: Array<IRoute> = [
	{
		icon: BookA,
		route: 'Секций',
		url: '/sections',
	},
	{
		icon: CirclePlus,
		route: 'Создать',
		url: '/sections/create',
	},
]

const SectionEdit: FC = () => {
	return (
		<>
			<Nav now='sections' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<SectionsCreatePage />
			</main>
		</>
	)
}

export default SectionEdit
