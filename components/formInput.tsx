import InputProps from '@/types/inputProps'

const FormInput = ({ L, S, I, T, V, O, N } : InputProps) => {
	return (
		<div className={S.wrapper}>
			<label htmlFor={I} className={S.formLabel}>{L}:</label>
			<input
				className={S.formInput}
				required
				minLength={5}
				id={I}
				type={T}
				placeholder={L}
				value={V}
				onChange={O}
				name={N}
			/>
			{
				
			}
			<div className={S.inputBottom} />
		</div>
	)
}

export default FormInput
