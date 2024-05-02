import User from '@/types/user'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import ProfileHeader from './profile-header'

interface IUserContactProps {
	userData?: User
}

const UserContact: FC<IUserContactProps> = ({ userData }) => {
	return (
		<>
			<ProfileHeader text='Данные для связи' />
			<div className='mt-5 mr-5 flex gap-5'>
				<div className='bg-red-50 p-5 rounded-2xl grow flex gap-5'>
					<Mail />
					<Link
						href={`mailto:${userData?.email}`}
						className='text-blue-400 hover:underline hover:text-blue-600'
						target='_blank'
					>
						{userData?.email}
					</Link>
				</div>
				<div className='bg-red-50 p-5 rounded-2xl grow flex gap-5'>
					<Phone />
					<Link
						href={`https://wa.me/${userData?.phone_number.replace(
							/\s|\(|\)/g,
							''
						)}`}
						target='_blank'
						className='text-blue-400 hover:underline hover:text-blue-600'
					>
						{userData?.phone_number}
					</Link>
				</div>
			</div>
		</>
	)
}

export default UserContact
