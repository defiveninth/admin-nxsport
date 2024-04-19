import { FC } from 'react'
import { UserCheck, CirclePlus } from 'lucide-react'
import Nav from '@/components/nav'
import CurrentRoute from '@/components/current-route'
import AdminsAddPage from '@/components/pages/admins-add-page'
import IRoute from '@/types/route'

const route: Array<IRoute> = [
	{
		icon: UserCheck,
		route: 'Админы',
		url: '/admins',
	},
	{
		icon: CirclePlus,
		route: 'Добавить',
		url: '/admins/add',
	},
]

const AddAdmin: FC = () => {
	return (
		<>
			<Nav now='admins' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<AdminsAddPage />
			</main>
		</>
	)
}

export default AddAdmin
