import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import FormError from '@/components/form-error'
import ISection from '@/types/sections'
import S from '@/styles/create-section.module.css'
import { Ban } from 'lucide-react'

interface ISectionEditPageProps {
	section: ISection;
	setSection: Dispatch<SetStateAction<ISection>>
}

const SectionEditPage: FC<ISectionEditPageProps> = ({
	section,
	setSection
}) => {
	
	const [formError, setFormError] = useState<string>('')

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			if (!section.name) {
				setFormError('Имя секций не может быть пустым')
				return
			}

			if (!section.description) {
				setFormError('Описание секций не может быть пустым')
				return
			}

			const response = await fetch('https://myapi.kz/sections/edit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(section),
			})

			if (!response.ok) {
				throw new Error('Failed to create section')
			}

			setSection({
				id: section.id,
				name: '',
				description: '',
				type_section: 0,
			})
			setFormError('')
		} catch (error) {
			console.error('Error creating section:', error)
		}
	}

	const handleInputChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = event.target
		setSection(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	return (
		<>
			<form className={S.form} onSubmit={handleSubmit}>
				<h2>Создать Секцию:</h2>
				<input
					placeholder='Имя Секций'
					name='name'
					value={section.name}
					onChange={handleInputChange}
				/>
				<textarea
					placeholder='Описание Секций'
					name='description'
					value={section.description}
					onChange={handleInputChange}
				></textarea>
				<select
					name='type_section'
					value={section.type_section}
					onChange={handleInputChange}
				>
					<option disabled value=''>
						Выберите тип секций:
					</option>
					<option value={0}>Обычный</option>
					<option value={1}>Лечебный</option>
				</select>
				{formError && <FormError error={formError} />}
				<div className='flex h-11 gap-5 font-semibold'>
					<button
						type='button'
						className={S.reset}
						title='Очистить формы'
						onClick={() => {
							setSection({
								id: section.id,
								name: '',
								description: '',
								type_section: 0,
							})
							setFormError('')
						}}
					>
						<Ban />
					</button>
					<button className={S.submit} type='submit'>
						Создать
					</button>
				</div>
			</form>
		</>
	)
}

export default SectionEditPage