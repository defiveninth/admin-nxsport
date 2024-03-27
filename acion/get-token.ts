'use server'

import { cookies } from 'next/headers'

const getToken = async () => {
	const CookieStore = cookies()
	const token = await CookieStore.get('token')

	return token?.value
}

export default getToken
