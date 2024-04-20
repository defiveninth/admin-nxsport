'use client'

import { FC, FormEvent, useState } from 'react'
import { Ban } from 'lucide-react'
import ISection from '@/types/sections'
import S from '@/styles/create-section.module.css'
import FormError from '@/components/form-error'

const SectionsCreatePage: FC = () => {
	const [formState, setFormState] = useState<Omit<ISection, 'id'>>({
		name: '',
		description: '',
		type_section: 0,
	})
  const [formError, setFormError] = useState<string>('')

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      if (!formState.name) {
        setFormError('Имя секций не может быть пустым');
        return;
      }
  
      if (!formState.description) {
        setFormError('Описание секций не может быть пустым');
        return;
      }
  
      const response = await fetch('http://localhost:3001/sections/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create section');
      }
  
      setFormState({
        name: '',
        description: '',
        type_section: 0,
      });
      setFormError('');
    } catch (error) {
      console.error('Error creating section:', error);
    }
  };
  

	const handleInputChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = event.target
		setFormState(prevState => ({
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
					value={formState.name}
					onChange={handleInputChange}
				/>
				<textarea
					placeholder='Описание Секций'
					name='description'
					value={formState.description}
					onChange={handleInputChange}
				></textarea>
				<select
					name='type_section'
					value={formState.type_section}
					onChange={handleInputChange}
				>
					<option disabled value=''>
						Выберите тип секций:
					</option>
					<option value={0}>Обычный</option>
					<option value={1}>Лечебный</option>
				</select>
        { formError && <FormError error={ formError } /> }
				<div className='flex h-11 gap-5 font-semibold'>
					<button
						type='button'
						className={S.reset}
						title='Очистить формы'
						onClick={() => {
							setFormState({
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

export default SectionsCreatePage
