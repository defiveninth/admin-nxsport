import { ChangeEvent, FC } from 'react'
import IFormData from './formdata'

interface IFormInputProps {
	icon: FC<any>,
	T: 'text' | 'password',
	placeholder: string
	length: number,
	data: IFormData,
	onChange: (e: ChangeEvent<HTMLInputElement>, field: keyof IFormData) => void,
	name: keyof IFormData
}

export default IFormInputProps
