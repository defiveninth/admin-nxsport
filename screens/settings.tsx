'use client'

import { FC } from 'react'
import Link from 'next/link'
import signOut from '@/actions/sign-out'

const SettingsPage: FC = () => {
	return (
		<div className='flex justify-center bg-pink-100 mr-5 py-5 rounded-2xl'>
			<div className='flex flex-col max-w-[888px] w-full gap-5'>
			<Link href='settings/tech-work' className='btn btn-outline'>технические работы</Link>
				<Link href='settings/change-password' className='btn btn-outline'>Изменить пароль</Link>
				<button
					className='btn btn-outline btn-error'
					onClick={() => signOut()}
				>
					Выйти из аккаунта
				</button>
			</div>
		</div>
	)
}

export default SettingsPage
