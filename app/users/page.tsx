import { FC } from 'react'
import { ShieldAlert, Users } from 'lucide-react'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import UserNotFoundPage from '@/components/pages/user-not-found-page'
import IRoute from '@/types/route'

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
