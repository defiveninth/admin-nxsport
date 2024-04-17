'use client'

import { FC, useState, useEffect } from 'react';
import Nav from '@/components/nav';
import IUserProfileProps from '@/types/user-profile.props';
import User from '@/types/user';
import CurrentRoute from '@/components/current-route'
import IRoute from '@/types/route'
import { CircleUserRound, GraduationCap } from 'lucide-react'
import Link from 'next/link'

const UserProfile: FC<IUserProfileProps> = ({ params: { id } }) => {
	const [userData, setUserData] = useState<User>();
	
  useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch('http://localhost:3001/users/get-user-data', {
					method: 'POST',
          headers: {
						'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id }),
        });
				
        if (!response.ok) {
					throw new Error('Failed to fetch user data');
        }
				
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
				console.error('Error fetching user data:', error);
      }
    };
		
    fetchUserData();
  }, [id]);
	
	const route: Array<IRoute> = [
		{
			icon: GraduationCap,
			route: 'Студенты',
			url: '/students'
		},
		{
			icon: CircleUserRound,
			route: `${userData?.first_name} ${userData?.last_name}`,
			url: `/users/${id}`
		},
	]

  return (
    <>
      <Nav now='students' />
			<main className='ml-[320px]'>
				<CurrentRoute route={ route } />
				<div className='bg-red-50 mr-5 p-5 rounded-2xl flex items-center gap-10'>
					<img src={ userData?.profile_photo } alt='userphoto' className='w-48 h-48 rounded-full border-4 border-solid border-red-500 p-1' />
					<div className='flex flex-col gap-1'>
						<h2 className='text-3xl font-semibold'>{ userData?.first_name } { userData?.last_name }</h2>
						<span>{ userData?.birth_date.split('-').reverse().join('-') }</span>
						<Link href={`https://wa.me/${userData?.phone_number.replace(
									/\s|\(|\)/g,
									''
								)}`}
								target='_blank' className='link link-primary'>{ userData?.phone_number }</Link>
						<Link href={`mailto:${userData?.email}`} className='link link-primary'>{ userData?.email }</Link>
					</div>
				</div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
			</main>
    </>
  );
};

export default UserProfile;
