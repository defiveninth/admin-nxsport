import UserNotFoundPage from '@/_pages/user-not-found'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import IRoute from '@/types/route'
import { ShieldAlert, Users } from 'lucide-react'
import { FC } from 'react'

const route: Array<IRoute> = [
	{
		icon: Users,
		route: 'Пользователей',
		url: '/users',
	},
	{
		icon: ShieldAlert,
		route: '404 Ошибка',
		url: '/users',
	},
]

const NotFound: FC = () => {
	return (
		<>
			<Nav now='students' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<UserNotFoundPage />
			</main>
		</>
	)
}

export default NotFound
