import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav/nav'
import SettingsPage from '@/screens/settings'
import IRoute from '@/types/route'
import { Bolt } from 'lucide-react'
import type { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Настройки',
}

const route: Array<IRoute> = [
	{
		icon: Bolt,
		route: 'Настройки',
		url: '/settings',
	},
]

const Settings: FC = () => {
	return (
		<>
			<Nav now='settings' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<SettingsPage />
			</main>
		</>
	)
}

export default Settings
