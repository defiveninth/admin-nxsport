'use client'

import { FC, useId, useState, ChangeEvent, FormEvent } from 'react'

import FormInput from './formInput'
import IFormData from '@/types/authFormData'
import login from '@/acion/login'

import SERVER from '@/data/url'

import S from '@/styles/authForm.module.css'

const AuthForm: FC = () => {
	const [formData, setFormData] = useState<IFormData>({
		username: '',
		password: '',
		error: undefined,
		loading: false,
	})

	const userNameId: string = useId()
	const passwordId: string = useId()

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const Submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			setFormData({ ...formData, loading: true })
			const response = await fetch(`${SERVER}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				throw new Error('Failed to authenticate')
			}

			const responseData = await response.json()
			login(responseData.token)
		} catch (error) {
			setFormData({
				...formData,
				error: 'Authentication failed',
				loading: false,
			})
		}
	}

	return (
		<form className={S.form} onSubmit={Submit}>
			<FormInput
				S={S}
				I={userNameId}
				L='Юзернэйм'
				T='text'
				V={formData.username}
				O={handleInputChange}
				N='username'
			/>
			<FormInput
				S={S}
				I={passwordId}
				L='Пароль'
				T='password'
				V={formData.password}
				O={handleInputChange}
				N='password'
			/>
			{formData.error && (
				<>
					<div role='alert' className='alert alert-warning'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='stroke-current shrink-0 h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
						<span>{formData.error}</span>
					</div>
				</>
			)}
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
