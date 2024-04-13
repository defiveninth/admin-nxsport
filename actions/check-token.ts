'use server'

import { cookies } from 'next/headers'

const checkToken: () => Promise<string | false> = async () => {
	const cookieStore = cookies()
	const T =  await cookieStore.get('token')
	return T ? T.value : false
}

export default checkToken
