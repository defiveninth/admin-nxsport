import { FC } from 'react'
import IFormInputProps from '@/types/form-input.props'

const FormInput: FC<IFormInputProps> = ({ icon: Icon, T, placeholder, length, data, onChange, name }) => {
	return (
		<>
			<label>
				<Icon />
				<input
					type={ T }
					placeholder={ placeholder }
					minLength={ length }
					value={typeof data[name] === 'boolean' ? '' : data[name]}
					name={ name }
					onChange={ e => onChange(e, name) }
				/>
			</label>
		</>
	)
}

export default FormInput
