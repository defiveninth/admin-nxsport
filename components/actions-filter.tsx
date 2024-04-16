import { FC } from 'react'

const ActionsFilter: FC = () => {
	return (
		<>
			<div className='bg-red-100 h-32 mr-5 mt-5 rounded-2xl'>
				<label className='label cursor-pointer'>
					<span className='label-text'>Remember me</span>
					<input type='checkbox' defaultChecked className='checkbox' />
				</label>
				<label className='label cursor-pointer'>
					<span className='label-text'>Remember me</span>
					<input type='checkbox' defaultChecked className='checkbox' />
				</label>
				<label className='label cursor-pointer'>
					<span className='label-text'>Remember me</span>
					<input type='checkbox' defaultChecked className='checkbox' />
				</label>
			</div>
		</>
	)
}

export default ActionsFilter
