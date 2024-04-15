import { FC } from 'react'
import type { Metadata } from 'next'
import { Bolt, KeyRound } from 'lucide-react'
import Nav from '@/components/nav'
import CurrentRoute from '@/components/current-route'
import ChangePassword from '@/components/change-password'
import IRoute from '@/types/route'
import S from '@/styles/change-password.module.css'

const route: Array<IRoute> = [
	{
		icon: Bolt,
		route: 'Настройки',
		url: '/settings'
	},
	{
		icon: KeyRound,
		route: 'Изменить пароль',
		url: '/settings/change-password'
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
				<CurrentRoute route={ route } />
				<div className={ S.formWrapper }>
					<ChangePassword />
				</div>
			</main>
		</>
	)
}

export default Settings
