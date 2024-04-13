'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const setToken = (T: string, shouldRedirect?: boolean) => {
	const cookieStore = cookies()
	cookieStore.set('token', T)

	if (shouldRedirect) redirect('/sections')
}

export default setToken
