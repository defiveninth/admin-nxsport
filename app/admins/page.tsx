import { FC } from 'react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Админы',
}

const Admins: FC = () => {
	return (
		<>
			<Nav now='admins' />
			<main className='ml-[320px]'>admins</main>
		</>
	)
}

export default Admins
