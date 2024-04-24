'use client'

import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { ISignUpData } from '@/types/formdata'
import FormSuccess from './form-success'
import FormError from './form-error'

const SignUpForm: FC = () => {
	const [formData, setFormData] = useState<ISignUpData>({
		username: '',
		password: '',
		isLoading: false,
		name: '',
		surname: '',
	})
	const [success, setSuccess] = useState<string>('')
	const [error, setError] = useState<string>('')

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (error) setError('')
		const { name, value } = event.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const response = await fetch('https://myapi.kz/auth/sign-up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
			if (!response.ok) setError('Невозможно создать пользователья')
			setSuccess('Новый админ успешно был создан')
			setFormData({
				username: '',
				password: '',
				isLoading: false,
				name: '',
				surname: '',
			})
		} catch (error) {
			setSuccess('')
			setError('Невозможно создать пользователья')
		}
	}

	return (
		<form onSubmit={submit}>
			<h2>Зарегистрировать Нового Админа:</h2>
			<input
				type='text'
				placeholder='Фамилия:'
				name='surname'
				onChange={handleInputChange}
				value={formData.surname}
			/>
			<input
				type='text'
				placeholder='Имя:'
				name='name'
				onChange={handleInputChange}
				value={formData.name}
			/>
			<input
				type='text'
				placeholder='Юзернейм:'
				name='username'
				onChange={handleInputChange}
				value={formData.username}
			/>
			<input
				type='password'
				placeholder='Пароль:'
				name='password'
				onChange={handleInputChange}
				value={formData.password}
			/>
			<button>Зарегистрировать</button>
			{ success && <FormSuccess T='sign-up' /> }
			{ error && <FormError error={ error } /> }
		</form>
	)
}

export default SignUpForm
