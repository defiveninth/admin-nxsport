'use client'

import { FC, useState } from 'react'

import S from '@/styles/authForm.module.css'

const AuthForm: FC = () => {
	const [formData, setFormData] = useState()
	return (
		<form className={S.form}>
			<input type='text' required />
			<input type='password' required />
			<button>Кіру</button>
		</form>
	)
}

export default AuthForm
