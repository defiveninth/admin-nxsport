import { FC } from 'react'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import AdminsPage from '@/pages/admins'
import IRoute from '@/types/route'
import { UserCheck } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Админы',
}

const route: Array<IRoute> = [
	{
		icon: UserCheck,
		route: 'Админы',
		url: '/admins',
	},
]

const Admins: FC = () => {
	return (
		<>
			<Nav now='admins' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<AdminsPage />
			</main>
		</>
	)
}

export default Admins
