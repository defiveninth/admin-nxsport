import { FC } from 'react'
import type { Metadata } from 'next'
import { TrainFront } from 'lucide-react'
import Nav from '@/components/nav'
import IRoute from '@/types/route'
import CurrentRoute from '@/components/current-route'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Тренеры',
}

const route: Array<IRoute> = [
	{
		icon: TrainFront,
		route: 'Тренеры',
		url: '/coaches'
	},
]

const Coaches: FC = () => {
	return (
		<>
			<Nav now='coaches' />
			<main className='ml-[320px]'>
				<CurrentRoute route={ route } />
			</main>
		</>
	)
}

export default Coaches
