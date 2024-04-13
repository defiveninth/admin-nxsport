import { FC } from 'react'

const ProfileCard: FC = () => {
	return (
		<>
			<div className={'h-32 bg-[#f6f6f6] flex items-center pl-6 gap-4'}>
				<div className='bg-[#7C71FF] h-12 w-12 rounded-lg'></div>
				<div className='flex flex-col'>
					<span>Sakenov Abdurrauf</span>
					<span>@dearM762</span>
				</div>
			</div>
		</>
	)
}

export default ProfileCard
