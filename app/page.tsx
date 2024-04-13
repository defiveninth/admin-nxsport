import { FC } from 'react'
import AuthForm from '@/components/auth-form'
import S from '@/styles/main-page.module.css'

const Home: FC = () => {
	return (
		<div className={ S.wrapper }>
			<h2>Нархоз Спорт | Админ</h2>
			<AuthForm />
		</div>
	)
}

export default Home
