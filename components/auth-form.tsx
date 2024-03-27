'use client'

import { FC, useId, useState } from 'react'

import FormInput from './formInput'

import IFormData from '@/types/authFormData'

import S from '@/styles/authForm.module.css'

const AuthForm: FC = () => {
	const [formData, setFormData] = useState<IFormData>({
		login: '',
		password: '',
		error: undefined,
		loading: false,
	})

	const userNameId: string = useId()
	const passwordId: string = useId()

	return (
		<form className={S.form}>
			<FormInput S={S} I={userNameId} L='Юзернэйм' T='text' />
			<FormInput S={S} I={passwordId} L='Пароль' T='password' />
			<button className={'btn btn-outline btn-error'}>
				{formData.loading ? (
					<span className={S.formLoading}></span>
				) : (
					<span>Кіру</span>
				)}
			</button>
		</form>
	)
}

export default AuthForm
