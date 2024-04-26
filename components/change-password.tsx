'use client'

import { FC, useState, ChangeEvent, FormEvent } from 'react'
import FormError from './form-error'
import FormSuccess from './form-success'
import checkToken from '@/actions/check-token'
import setToken from '@/actions/set-token'
import IChangePasswordData from '@/types/change-password-data'

const ChangePassword: FC = () => {
	const [formData, setFormData] = useState<IChangePasswordData>({
		current: '',
		new: '',
		accept: '',
	})
	const [error, setError] = useState<string>('')
	const [success, setSuccess] = useState<boolean>(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
		setError('')
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (
			formData.current === '' ||
			formData.new === '' ||
			formData.accept === ''
		) {
			setError('Пароли должны быть не пустыми')
			return
		}
		if (formData.new.length < 5) {
			setError('Новый пароль должен содержать минимум 5 символов')
			return
		}
		if (formData.new !== formData.accept) {
			setError('Новые пароли не совпадают')
			return
		}
		if (formData.current === formData.new) {
			setError('Новый пароль не должен совпадать со старым')
			return
		}

		setError('')

		const T = await checkToken()

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						oldPassword: formData.current,
						newPassword: formData.new,
						token: T,
					}),
				}
			)

			if (!response.ok) setError('Failed to change password')

			const data = await response.json()
			setToken(data.token)
			setFormData({
				current: '',
				new: '',
				accept: '',
			})
			setSuccess(true)
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<h2>Изменить пароль:</h2>
				<input
					type='password'
					placeholder='Текущий пароль'
					name='current'
					value={formData.current}
					onChange={handleChange}
					minLength={5}
				/>
				<input
					type='password'
					placeholder='Новый пароль'
					name='new'
					value={formData.new}
					onChange={handleChange}
					minLength={5}
				/>
				<input
					type='password'
					placeholder='Подтвердите пароль'
					name='accept'
					value={formData.accept}
					onChange={handleChange}
					minLength={5}
				/>
				{success && <FormSuccess T='change-password' />}
				{error && <FormError error={error} />}
				<button type='submit'>Изменить</button>
			</form>
		</>
	)
}

export default ChangePassword
