import { FC } from 'react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Изменить Пароль',
}

const Settings: FC = () => {
	return (
		<>
			<Nav now='settings/change-password' />
			<main className='ml-[320px]'>settings/change-password</main>
		</>
	)
}

export default Settings
