import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import AdminsAddPage from '@/pages/admins-add-page'
import IRoute from '@/types/route'
import { CirclePlus, UserCheck } from 'lucide-react'
import { FC } from 'react'

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
