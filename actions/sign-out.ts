'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const signOut = (P?: string) => {
	const cookieStore = cookies()
	cookieStore.delete('token')
	redirect(P ? P : '/')
}

export default signOut
