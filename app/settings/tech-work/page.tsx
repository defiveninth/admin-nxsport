import ChangePassword from '@/components/change-password'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav/nav'
import TechWork from '@/screens/tech-work'
import S from '@/styles/change-password.module.css'
import IRoute from '@/types/route'
import { Bolt, ShieldAlert } from 'lucide-react'
import type { Metadata } from 'next'
import { FC } from 'react'

const route: Array<IRoute> = [
	{
		icon: Bolt,
		route: 'Настройки',
		url: '/settings',
	},
	{
		icon: ShieldAlert,
		route: 'Технические работы',
		url: '/settings/tech-work',
	},
]

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Технические работы',
}

const Settings: FC = () => {
	return (
		<>
			<Nav now='settings' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<div className={S.techWrapper}>
					<TechWork />
				</div>
			</main>
		</>
	)
}

export default Settings
