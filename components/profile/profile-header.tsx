import { FC } from 'react'

interface IProfileHeaderProps {
	text: string
}

const ProfileHeader: FC<IProfileHeaderProps> = ({ text }) => {
	return (
		<>
			<h2 className='mt-5 font-semibold text-xl'>{ text }:</h2>
		</>
	)
}

export default ProfileHeader
