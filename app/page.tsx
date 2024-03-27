import { FC } from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'

import AuthForm from '@/components/auth-form'

import S from '@/styles/home.module.css'

export const metadata: Metadata = {
	title: 'Narxoz Sport | Кіру',
}

const Home: FC = () => {
	return (
		<main className={S.main}>
			<div className={S.red}>
				<Image alt='nx' src={'/nx-logo.png'} width={80} height={80}></Image>
			</div>
			<div className={S.wrapper}>
				<h1 className={S.formHeader}>Narxoz Sport | Кіру</h1>
				<AuthForm />
			</div>
		</main>
	)
}

export default Home
