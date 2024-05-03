'use client'

import { FC, useId } from 'react'

const TechWork: FC = () => {
	const checkboxID = useId()
	const messageID = useId()

	

	return (
		<>
			<form>
				<h2 className='font-medium text-lg mb-5'>Предупредить о техническом работе:</h2>
				<div className='flex justify-between'>
					<label htmlFor={checkboxID}>
						Предупреждение:
					</label>
					<input type="checkbox" value="synthwave" className="toggle theme-controller mb-5" id={checkboxID} />
				</div>
				<label htmlFor={messageID}>Сообщение Предупреждений:</label>
				<textarea className="textarea textarea-error w-full font-medium mt-5" placeholder="Ваше Сообщение:" id={messageID}></textarea>
			</form>
		</>
	)
}

export default TechWork
