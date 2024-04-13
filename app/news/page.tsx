import { FC } from 'react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Новости',
}

const News: FC = () => {
	return (
		<>
			<Nav now='news' />
			<main className='ml-[320px]'>news</main>
		</>
	)
}

export default News
