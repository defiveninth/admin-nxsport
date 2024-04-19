import { FC } from 'react'
import { Activity } from 'lucide-react'
import type { Metadata } from 'next'
import IRoute from '@/types/route'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import ActionsPage from '@/components/pages/actions-page'

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
