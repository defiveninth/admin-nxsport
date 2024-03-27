import InputProps from '@/types/inputProps'

const FormInput = ({ L, S, ID, T } : InputProps) => {
	return (
		<>
			<label htmlFor={ID}>{L}:</label>
			<input
				className={S.formInput}
				required
				minLength={5}
				id={ID}
				type={T}
			/>
		</>
	)
}

export default FormInput
