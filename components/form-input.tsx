import { FC } from 'react'
import IFormInputProps from '@/types/form-input.props'

const FormInput: FC<IFormInputProps> = ({ icon: Icon, T, placeholder, length, onChange, data, name }) => {
	return (
		<>
			<label>
				<Icon />
				<input
					type={ T }
					placeholder={ placeholder }
					minLength={ length }
					value={ eval(`data.${name}`) }
					name={ name }
					onChange={ e => onChange(e, name) }
				/>
			</label>
		</>
	)
}

export default FormInput
