import { FC } from 'react'
import type { Metadata } from 'next'
import { Bolt } from 'lucide-react'
import Nav from '@/components/nav'
import CurrentRoute from '@/components/current-route'
import IRoute from '@/types/route'
import SettingsPage from '@/components/pages/settings-page'

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

const Settings: FC = () => {
	return (
		<>
			<Nav now='settings' />
			<main className='ml-[320px]'>
				<CurrentRoute route={ route } />
				<SettingsPage />
			</main>
		</>
	)
}

export default Settings
