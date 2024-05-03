import { FC } from 'react'
import type { Metadata } from 'next'
import IRoute from '@/types/route'
import { CalendarCheck2 } from 'lucide-react'
import Nav from '@/components/nav/nav'
import CurrentRoute from '@/components/current-route'
// import SectionsAddPage from '@/screens/sections-add'

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Календар Секций',
}

const route: Array<IRoute> = [
	{
		icon: CalendarCheck2,
		route: 'Календар Секций',
		url: '/calendar',
	},
	{
		icon: CalendarCheck2,
		route: 'Добавить Секций',
		url: '/calendar/add',
	},
]

const Calendar: FC = () => {
	return (
		<>
			<Nav now='calendar' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				{/* <SectionsAddPage /> */}
			</main>
		</>
	)
}

export default Calendar
