import { ChangeEvent, FC } from 'react'
import { ISignInData } from './formdata'

interface IFormInputProps {
	icon: FC<any>,
	T: 'text' | 'password',
	placeholder: string
	length: number,
	data: ISignInData,
	onChange: (e: ChangeEvent<HTMLInputElement>, field: keyof ISignInData) => void,
	name: keyof ISignInData
}

export default IFormInputProps
