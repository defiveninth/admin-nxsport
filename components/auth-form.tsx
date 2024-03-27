'use client'

import { FC, useId, useState } from 'react'

import IFormData from '@/types/authFormData'

import S from '@/styles/authForm.module.css'
import FormInput from './formInput'

const AuthForm: FC = () => {
	const [formData, setFormData] = useState<IFormData>({
		login: '',
		password: '',
		error: undefined,
	})

	const userNameId: string = useId()
	const passwordId: string = useId()

	return (
		<form className={S.form}>
			<FormInput S={S} ID={userNameId} L='Юзернэйм' T='text' />
			<FormInput S={S} ID={passwordId} L='Пароль' T='password' />
			<button>Кіру</button>
		</form>
	)
}

export default AuthForm
