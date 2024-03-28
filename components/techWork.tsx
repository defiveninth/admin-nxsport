'use client'

import { FC, useState, ChangeEvent, useEffect } from 'react'
import IData from '@/types/techProps'
import S1 from '@/styles/main.module.css'
import getToken from '@/acion/get-token'

const TechWork: FC = () => {
	const [formData, setFormData] = useState<IData>({
		status: 1,
		text: '',
	})
	const [token, setToken] = useState<string | undefined>('')

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

			const response = await fetch(
				'http://91.147.92.79:5000/api/admin/setting/seethosework/toggle',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token: '777a9a32e10e590aa337fd0b0ce53726' }),
				}
			)

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			const data = await response.json()
			setFormData(data)
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await getToken()

				const response = await fetch(
					'http://91.147.92.79:5000/api/admin/setting/seethosework',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ token: '777a9a32e10e590aa337fd0b0ce53726' }),
					}
				)

				if (!response.ok) {
					throw new Error('Network response was not ok')
				}

				const data = await response.json()
				setFormData(data)
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error)
			}
		}

		fetchData()

		console.log(formData)
	}, [])

	return (
		<form>
			<div className={S1.line}>
				<h2>Предупредить технические работы:</h2>
				<input
					type='checkbox'
					className='toggle toggle-error'
					checked={formData.status == 1}
					onChange={handleCheckboxClick}
				/>
			</div>
			<input
				name='message'
				disabled={formData.status == 1}
				id=''
				className={`w-full px-4 h-16 mt-5 outline-none border-none rounded-lg ${
					!formData.status ? 'bg-white' : 'bg-slate-500'
				}`}
				onChange={handleInputChange}
				value={formData.text}
				placeholder={
					formData.status == 0
						? 'Технические работы отключено'
						: 'Ваше сообшение:'
				}
			/>
		</form>
	)
}

export default TechWork
