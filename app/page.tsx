import { FC } from 'react'

import AuthForm from '@/components/auth-form'

import S from '@/styles/home.module.css'

const Home: FC = () => {
	return (
		<main className={S.main}>
			<div className={S.wrapper}>
				<h1 className={S.formHeader}>NX-Sport | Войти</h1>
        <AuthForm />
			</div>
		</main>
	)
}

export default Home
