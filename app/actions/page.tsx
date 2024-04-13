import { FC } from 'react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Действий',
}

const Actions: FC = () => {
	return (
		<>
			<Nav now='actions' />
			<main className='ml-[320px]'>actions</main>
		</>
	)
}

export default Actions
