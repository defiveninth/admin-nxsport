import Nav from '@/components/nav/nav'
import UserProfilePage from '@/screens/user-profile'
import IUserProfileProps from '@/types/user-profile.props'
import { FC } from 'react'

const TrainerProfile: FC<IUserProfileProps> = ({ params: { id } }) => {
	return (
		<>
			<Nav now='coaches' />
			<main className='ml-[320px]'>
				<UserProfilePage id={id} />
			</main>
		</>
	)
}

export default TrainerProfile
