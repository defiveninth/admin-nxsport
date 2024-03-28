'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const toOutside = async () => {
	const cookieStore = cookies()

	const T = await cookieStore.get('token')

	if (!T) redirect('/')
}

export default toOutside
