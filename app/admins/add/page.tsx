import { FC } from 'react'
import { UserCheck, CirclePlus } from 'lucide-react'
import Nav from '@/components/nav'
import CurrentRoute from '@/components/current-route'
import IRoute from '@/types/route'
import SignUpForm from '@/components/sign-up-form'
import S from '@/styles/sign-up-form.module.css'

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
				<div className={ S.formWrapper }>
					<SignUpForm />
				</div>
			</main>
		</>
	)
}

export default AddAdmin
