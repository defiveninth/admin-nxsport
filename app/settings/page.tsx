import { FC } from 'react'
import type { Metadata } from 'next'
import { Bolt } from 'lucide-react'
import Nav from '@/components/nav'
import CurrentRoute from '@/components/current-route'
import IRoute from '@/types/route'
import Test from '@/components/test'

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Настройки',
}

const route: Array<IRoute> = [
	{
		icon: Bolt,
		route: 'Настройки',
		url: '/settings'
	},
]

const SettingsPage: FC = () => {
	return (
		<>
			<Nav now='settings' />
			<main className='ml-[320px]'>
				<CurrentRoute route={ route } />
				<Test />
			</main>
		</>
	)
}

export default SettingsPage
