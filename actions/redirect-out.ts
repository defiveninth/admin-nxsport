'use server'

import { redirect } from 'next/navigation'

const redirectOut = () => {
	redirect('/')
}

export default redirectOut
