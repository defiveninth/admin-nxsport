'use server'

import { redirect } from 'next/navigation'

const redirectIn = () => {
	redirect('/sections')
}

export default redirectIn
