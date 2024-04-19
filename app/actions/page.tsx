import ActionsPage from '@/_pages/actions'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import IRoute from '@/types/route'
import { Activity } from 'lucide-react'
import type { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Действий',
}

const route: Array<IRoute> = [
	{
		icon: Activity,
		route: 'Действий',
		url: '/actions',
	},
]

const Actions: FC = () => {
	return (
		<>
			<Nav now='actions' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<ActionsPage />
			</main>
		</>
	)
}

export default Actions
