import { FC } from 'react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Тренеры',
}

const Coaches: FC = () => {
	return (
		<>
			<Nav now='coaches' />
			<main className='ml-[320px]'>coaches</main>
		</>
	)
}

export default Coaches
