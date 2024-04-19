import { FC } from 'react';
import Nav from '@/components/nav';
import UserProfilePage from '@/components/pages/user-profile-page'
import IUserProfileProps from '@/types/user-profile.props'

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

export default UserProfile;
