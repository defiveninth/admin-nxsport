import { FC } from 'react'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav/nav'
import CoachesPage from '@/screens/coaches'
import IRoute from '@/types/route'
import { TrainFront } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Тренеры',
}

const route: Array<IRoute> = [
	{
		icon: TrainFront,
		route: 'Тренеры',
		url: '/coaches',
	},
]

const Coaches: FC = () => {
	return (
		<>
			<Nav now='coaches' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<CoachesPage />
			</main>
		</>
	)
}

export default Coaches
