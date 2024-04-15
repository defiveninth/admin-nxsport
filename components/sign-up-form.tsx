'use client'

import React, { FC, FormEvent, useState } from 'react'
import { ISignUpData } from '@/types/formdata'

const SignUpForm: FC = () => {
	const [formData, setFormData] = useState<ISignUpData>({
		username: '',
		password: '',
		isLoading: false,
		name: '',
		surname: '',
	})

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(formData)
	}

	return (
		<form onSubmit={submit}>
			<h2>Зарегистрировать Нового Админа:</h2>
			<input
				type='text'
				placeholder='Фамилия:'
				name='surname'
				onChange={handleInputChange}
			/>
			<input
				type='text'
				placeholder='Имя:'
				name='name'
				onChange={handleInputChange}
			/>
			<input
				type='text'
				placeholder='Юзернейм:'
				name='username'
				onChange={handleInputChange}
			/>
			<input
				type='password'
				placeholder='Пароль:'
				name='password'
				onChange={handleInputChange}
			/>
			<button>Зарегистрировать</button>
		</form>
	)
}

export default SignUpForm
