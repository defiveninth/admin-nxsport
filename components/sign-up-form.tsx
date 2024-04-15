'use client'

import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { ISignUpData } from '@/types/formdata'
import FormSuccess from './form-success'

const SignUpForm: FC = () => {
	const [formData, setFormData] = useState<ISignUpData>({
		username: '',
		password: '',
		isLoading: false,
		name: '',
		surname: '',
	})
	const [success, setSuccess] = useState<string>('')

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const response = await fetch('http://localhost:3001/auth/sign-up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			const data = await response.json()
			console.log('SignUp successful:', data)
			setFormData({
				username: '',
				password: '',
				isLoading: false,
				name: '',
				surname: '',
			})
		} catch (error) {
			console.error('Error while signing up:', error)
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
		</form>
	)
}

export default SignUpForm
