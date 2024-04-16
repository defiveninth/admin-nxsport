'use client'

import { FC } from 'react'
import signOut from '@/actions/sign-out'

const Test: FC = () => {
	return (
		<button className="btn btn-outline btn-accent" onClick={() => signOut()}>signOut()</button>
	)
}

export default Test
