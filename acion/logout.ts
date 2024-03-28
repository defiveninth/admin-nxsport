'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const logout = async () => {
	const cookieStore = cookies()

	await cookieStore.delete('token')

	redirect('/')
}

export default logout
