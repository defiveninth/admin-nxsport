import { FC } from 'react'
import SignUpForm from '../sign-up-form'
import S from '@/styles/sign-up-form.module.css'

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
