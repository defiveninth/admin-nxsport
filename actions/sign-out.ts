'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const signOut = () => {
	const cookieStore = cookies()
	cookieStore.delete('token')
	redirect('/')
}

export default signOut
