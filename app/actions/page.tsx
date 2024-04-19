import { FC } from 'react'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import ActionsPage from '@/pages/actions'
import IRoute from '@/types/route'
import { Activity } from 'lucide-react'
import type { Metadata } from 'next'

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
