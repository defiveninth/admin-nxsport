import UserProfilePage from '@/_pages/user-profile'
import Nav from '@/components/nav'
import IUserProfileProps from '@/types/user-profile.props'
import { FC } from 'react'

const UserProfile: FC<IUserProfileProps> = ({ params: { id } }) => {
	return (
		<>
			<Nav now='students' />
			<main className='ml-[320px]'>
				<UserProfilePage id={id} />
			</main>
		</>
	)
}

export default UserProfile
