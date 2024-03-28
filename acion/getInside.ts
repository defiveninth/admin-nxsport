'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const toInside = async () => {
	const cookieStore = cookies()

	const T = await cookieStore.get('token')

	if (T) redirect('/admin')
}

export default toInside
