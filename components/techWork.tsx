'use client'

import { FC, useState, ChangeEvent, useEffect } from 'react'
import IData from '@/types/techProps'
import S1 from '@/styles/main.module.css'
import getToken from '@/acion/get-token'

const TechWork: FC = () => {
	const [formData, setFormData] = useState<IData>({
		techWorks: false,
		message: '',
	})
	const [token, setToken] = useState<string | undefined>('')

	const handleCheckboxClick = () => {
		setFormData({
			...formData,
			techWorks: !formData.techWorks,
		})
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await getToken()

				const response = await fetch(
					`http://91.147.92.79:5000/api/admin/setting/seethosework?token=${token}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)

				if (!response.ok) {
					throw new Error('Network response was not ok')
				}

				const data = await response.json()
				console.log(data) // Log the response data
			} catch (error) {
				console.error('There was a problem with the fetch operation:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<form>
			<div className={S1.line}>
				<h2>Предупредить технические работы:</h2>
				<input
					type='checkbox'
					className='toggle toggle-error'
					checked={formData.techWorks}
					onClick={handleCheckboxClick}
				/>
			</div>
			<input
				name='message'
				disabled={formData.techWorks}
				id=''
				className={`w-full px-4 h-16 mt-5 outline-none border-none rounded-lg ${
					!formData.techWorks ? 'bg-white' : 'bg-slate-500'
				}`}
				onChange={handleInputChange}
				value={formData.message}
				placeholder={
					formData.techWorks
						? 'Технические работы отключено'
						: 'Ваше сообшение:'
				}
			/>
		</form>
	)
}

export default TechWork
