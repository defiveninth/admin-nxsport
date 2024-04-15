import { FC } from 'react'
import type { Metadata } from 'next'
import { UserCheck } from 'lucide-react'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import IRoute from '@/types/route'
import AdminPage from '@/components/admins'

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
				<AdminPage />
			</main>
		</>
	)
}

export default Admins
