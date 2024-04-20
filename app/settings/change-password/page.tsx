import ChangePassword from '@/components/change-password'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav/nav'
import S from '@/styles/change-password.module.css'
import IRoute from '@/types/route'
import { Bolt, KeyRound } from 'lucide-react'
import type { Metadata } from 'next'
import { FC } from 'react'

const route: Array<IRoute> = [
	{
		icon: Bolt,
		route: 'Настройки',
		url: '/settings',
	},
	{
		icon: KeyRound,
		route: 'Изменить пароль',
		url: '/settings/change-password',
	},
]

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Изменить Пароль',
}

const Settings: FC = () => {
	return (
		<>
			<Nav now='settings' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<div className={S.formWrapper}>
					<ChangePassword />
				</div>
			</main>
		</>
	)
}

export default Settings
