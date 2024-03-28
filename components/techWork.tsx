'use client'

import { FC, useState, ChangeEvent, useEffect, FormEvent } from 'react'

import IData from '@/types/techProps'
import getToken from '@/acion/get-token'

import S1 from '@/styles/main.module.css'

const TechWork: FC = () => {
	const [formData, setFormData] = useState<IData>({
		status: 1,
		text: '',
		isLoading: true,
	})

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
				'https://aidarov-museum.kz/api/admin/setting/seethosework/toggle',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token }),
				}
			)

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

				const response = await fetch(
					'https://aidarov-museum.kz/api/admin/setting/seethosework',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ token }),
					}
				)

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

    fetch('https://aidarov-museum.kz/api/admin/setting/seethosework/update_text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
					token,
					new_text: formData.text
				})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
};

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
					value={formData.text}
					placeholder={
						!formData.status
							? 'Технические работы отключено'
							: 'Ваше сообшение:'
					}
				/>
				<button className='btn btn-outline btn-primary'>Сохранить</button>
			</div>
		</form>
	)
}

export default TechWork
