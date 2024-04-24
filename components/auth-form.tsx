'use client'

import { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react'
import UsernameIcon from './username-icon'
import PasswordIcon from './password-icon'
import FormInput from './form-input'
import { ISignInData } from '@/types/formdata'
import FormError from './form-error'
import setToken from '@/actions/set-token'
import checkToken from '@/actions/check-token'
import redirectIn from '@/actions/redirect-in'
import S from '@/styles/auth-form.module.css'

const AuthForm: FC = () => {
	useEffect(() => {
		const checkTokenAndRedirect = async () => {
			const T = await checkToken()
			if (T) redirectIn()
		}
		checkTokenAndRedirect()
	}, [])

	const [formData, setFormData] = useState<ISignInData>({
		username: '',
		password: '',
		isLoading: false,
	})

	const [error, setError] = useState<string>('')

	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		field: keyof ISignInData
	) => {
		if (error) setError('')
		const { value } = e.target
		setFormData(prevData => ({
			...prevData,
			[field]: value,
		}))
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setFormData({ ...formData, isLoading: true })

		try {
			const response = await fetch('https://myapi.kz/auth/sign-in', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: formData.username,
					password: formData.password,
				}),
			})

			const res = await response.json()

			if (response.ok) {
				setToken(res.token, true)
			} else if (response.status === 404) {
				setError('Ошибка авторизаций, неверные данные')
			} else if (response.status >= 500) {
				setError('Ошибка авторизаций, Сервер не отвечает')
			} else {
				setError('Произошла ошибка при обработке запроса')
			}	
		} catch (e) {
			setError('Произошла ошибка при обработке запроса')
		} finally {
			setFormData({ ...formData, isLoading: false })
		}
	}

	return (
		<form className={S.form} onSubmit={handleSubmit}>
			<FormInput
				icon={UsernameIcon}
				T='text'
				length={5}
				placeholder='Username'
				data={formData}
				onChange={handleChange}
				name='username'
			/>
			<FormInput
				icon={PasswordIcon}
				T='password'
				length={5}
				placeholder='Password'
				data={formData}
				onChange={handleChange}
				name='password'
			/>
			{error && <FormError error={error} />}
			<button>
				{formData.isLoading ? (
					<span className='loading loading-infinity loading-md'></span>
				) : (
					'Войти'
				)}
			</button>
		</form>
	)
}

export default AuthForm
