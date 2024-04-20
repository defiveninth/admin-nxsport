'use client'

import { FC, useEffect, useState } from 'react'
import IUserData from '@/types/user-data'
import checkToken from '@/actions/check-token'
import signOut from '@/actions/sign-out'
import S from '@/styles/profile-card.module.css'

const ProfileCard: FC = () => {
	const [data, setData] = useState<IUserData>({
		id: NaN,
		name: '',
		surname: '',
		username: '',
		isSuperUser: ''
	})
	const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
		const T = await checkToken()
		if (!T) signOut()
      try {
        const response = await fetch('http://localhost:3001/auth/get-admin-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: T
          }),
        })
        const res = await response.json()
        if (response.ok) setData(res)
				else signOut()
      } catch (error) {
				signOut()
      } finally {
				setIsLoading(false)
			}
    }
    fetchData()
  }, [])

	if (loading) return (
		<div className={ S.cardWhileLoading }>
			<span className={ S.loader }></span>
		</div>
	)

	return (
		<>
			<div className={ S.cardWhenLoaded }>
				<div className='bg-[#ff7171] h-12 w-12 rounded-lg'></div>
				<div className='flex flex-col'>
					<span>{ data.surname } { data.name }</span>
					<span>@{ data.username }</span>
				</div>
			</div>
		</>
	)
}

export default ProfileCard
