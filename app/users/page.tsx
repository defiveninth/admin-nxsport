import { FC } from 'react'
import { ShieldAlert, Users } from 'lucide-react'
import Link from 'next/link'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
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
				<h2 className='text-center text-5xl font-bold mt-32'>404</h2>
				<h2 className='text-center font-semibold text-xl mt-5'>
					Этот пользователь не найден
				</h2>
				<h2 className='text-center mt-5'>
					<Link
						href={'/'}
						className='btn btn-outline btn-error mx-auto text-center px-16'
					>
						Домой
					</Link>
				</h2>
			</main>
		</>
	)
}

export default NotFound
