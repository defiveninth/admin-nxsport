'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const login: (T: string) => void = async T => {
	const cookieStore = cookies()
	await cookieStore.set('token', T)
	redirect('/admin')
}

export default login
