'use client'

import { FC, useState, ChangeEvent, useEffect, FormEvent } from 'react'
import getToken from '@/acion/get-token'
import SERVER from '@/data/url'
import IData from '@/types/techProps'

import S1 from '@/styles/main.module.css'

const TechWork: FC = () => {
	const [formData, setFormData] = useState<IData>({
		status: 1,
		text: '',
		isLoading: true,
	})
	const [showAlert, setShowAlert] = useState(false)

	const handleCheckboxClick = () => {
		setFormData({
			...formData,
			status: !formData.status,
		})
		toggleStatus()
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const toggleStatus = async () => {
		try {
			const token = await getToken()

			const response = await fetch(`${SERVER}/setting/seethosework/toggle`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
			})

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			const { status } = await response.json()
			setFormData(prevState => ({
				...prevState,
				status: status,
			}))
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await getToken()

				const response = await fetch(`${SERVER}/setting/seethosework`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token }),
				})

				if (!response.ok) {
					throw new Error('Network response was not ok')
				}

				const { status, text } = await response.json()
				setFormData(prevState => ({
					...prevState,
					isLoading: false,
					status: status,
					text: text,
				}))
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error)
			}
		}

		fetchData()
	}, [])

	const updateText = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const token = await getToken()

		fetch(`${SERVER}/setting/seethosework/update_text`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token,
				new_text: formData.text,
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then(data => {
				console.log(data)
				setShowAlert(true) // Show alert after updating text
				setTimeout(() => {
					setShowAlert(false) // Hide alert after 3 seconds
				}, 3000)
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error)
			})
	}

	return (
		<form className={S1.form} onSubmit={updateText}>
			<div className={S1.line}>
				<h2>Предупредить технические работы:</h2>
				{formData.isLoading ? (
					<span className='loading loading-spinner text-error'></span>
				) : (
					<input
						type='checkbox'
						className='toggle toggle-error'
						checked={formData.status == 1}
						onChange={handleCheckboxClick}
					/>
				)}
			</div>
			<div className={S1.secLine}>
				<input
					name='text'
					disabled={formData.status == 0}
					id=''
					className={`w-full px-4 h-12 outline-none border-none rounded-lg ${
						formData.status ? 'bg-white' : 'bg-slate-500'
					}`}
					onChange={handleInputChange}
					value={formData.status == 1 ? formData.text : ''}
					placeholder={
						!formData.status
							? 'Технические работы отключено'
							: 'Ваше сообщение:'
					}
				/>
				<button type='submit' className='btn btn-outline btn-primary'>
					Сохранить
				</button>
			</div>
			{showAlert && (
				<div role='alert' className='alert alert-info'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						className='stroke-current shrink-0 w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						></path>
					</svg>
					<span>Информация успешно изменен.</span>
				</div>
			)}
		</form>
	)
}

export default TechWork
