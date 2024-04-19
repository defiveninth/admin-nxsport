import React from 'react'
import Link from 'next/link'

function UserNotFoundPage() {
	return (
		<>
			<h2 className='text-center text-5xl font-bold mt-32'>404</h2>
				<h2 className='text-center font-semibold text-xl mt-5'>
					Этот пользователь не найден
				</h2>
				<h2 className='text-center mt-5'>
					<Link
						href={'/sections'}
						className='btn btn-outline btn-error mx-auto text-center px-16'
					>
						Домой
					</Link>
				</h2>
		</>
	)
}

export default UserNotFoundPage
