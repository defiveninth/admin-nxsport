'use client'

import { FC, useState, ChangeEvent } from 'react'
import IData from '@/types/techProps'
import S1 from '@/styles/main.module.css'

const TechWork: FC = () => {
	const [formData, setFormData] = useState<IData>({
		techWorks: false,
		message: '',
	})

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
