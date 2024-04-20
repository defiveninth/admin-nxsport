import S from '@/styles/sign-up-form.module.css'
import { FC } from 'react'
import SignUpForm from '../components/sign-up-form'

const AdminsAddPage: FC = () => {
	return (
		<>
			<div className={S.formWrapper}>
				<SignUpForm />
			</div>
		</>
	)
}

export default AdminsAddPage
