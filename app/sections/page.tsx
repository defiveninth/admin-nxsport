import { FC } from 'react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Секций',
}

const Controll: FC = () => {
	return (
		<>
			<Nav now='sections' />
			<main className='ml-[320px]'>sections</main>
		</>
	)
}

export default Controll
