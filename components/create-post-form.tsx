'use client'

import { FC, FormEvent, useState } from 'react'
import { Ban } from 'lucide-react'
import FormError from './form-error'
import IPostData from '@/types/post-data'

const placeHolderText: Array<string> = [
	'Поделитесь своими мыслями о нархозе',
	'Что вас интересует в жизни студента НАРХОЗа?',
	'Есть что рассказать о студенческой жизни?',
	'Расскажите о своем опыте в НАРХОЗе',
	'Чем заняться студентам в спорткомплексе?',
	'Что вас может привлекает студентов в спорткомплексе?',
	'Поделитесь своими планами на спортивные занятия',
	'Есть ли что-то, что хотели бы узнать о купле абонементов в спорткомплексе?',
	'Что сегодня будет анонсировать?',
]

const CreatePostForm: FC = () => {
	const [formData, setFormData] = useState<IPostData>({
		title: '',
		description: '',
	})

	const [placeholder, setPlaceholder] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [success, setSuccess] = useState<string>('')

	const getRandomPlaceholder = () => {
		const randomIndex = Math.floor(Math.random() * placeHolderText.length)
		return placeHolderText[randomIndex]
	}

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!formData.title) {
			setError('Заголовок не может быть пустым')
			return
		}
		if (!formData.description) {
			setError('Контент не может быть пустым')
			return
		}

		try {
			const response = await fetch('http://localhost:3001/news/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				setError('Failed to create post')
			}

			setSuccess('Пост был успешно создан')

			setFormData({ title: '', description: '' })
			setError('')
		} catch (error) {
			setError('Failed to create post')
		}
	}

	useState(() => {
		setPlaceholder(getRandomPlaceholder())
	})

	return (
		<div className='bg-[#F8F8FF] mr-5 p-4 rounded-2xl flex justify-center'>
			<form
				className='max-w-[888px] w-full flex flex-col gap-5'
				onSubmit={handleFormSubmit}
			>
				<h2 className='font-semibold text-2xl'>Создать новый пост:</h2>
				<input
					placeholder='Заголовок'
					className='input input-bordered input-primary w-full bg-white font-medium text-lg'
					value={formData.title}
					onChange={e => {
						setFormData({ ...formData, title: e.target.value })
						setError('')
					}}
				/>
				<textarea
					className='textarea textarea-primary font-medium text-lg'
					placeholder={placeholder}
					rows={3}
					value={formData.description}
					onChange={e => {
						setFormData({ ...formData, description: e.target.value })
						setError('')
					}}
				></textarea>
				{error && <FormError error={error} />}
				<div className='flex h-11 gap-5 font-semibold'>
					<button
						type='button'
						className='bg-red-500 text-white px-4 rounded-lg'
						onClick={() => {
							setFormData({ title: '', description: '' })
							setError('')
						}}
						title='Очистить формы'
					>
						<Ban />
					</button>
					<button
						className='bg-cyan-400 hover:bg-cyan-300 hover:text-gray-700 transition-colors grow rounded-lg text-black'
						type='submit'
					>
						Создать
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreatePostForm
