import { FC } from 'react'
import type { Metadata } from 'next'
import { Newspaper } from 'lucide-react'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import Posts from '@/components/news'
import CreatePostForm from '@/components/create-post-form'
import IRoute from '@/types/route'

export const metadata: Metadata = {
  title: 'Нархоз Спорт | Новости',
}

const route: Array<IRoute> = [
	{
		icon: Newspaper,
		route: 'Новости',
		url: '/news'
	},
]

const News: FC = () => {
	return (
		<>
			<Nav now='news' />
			<main className='ml-[320px]'>
				<CurrentRoute route={ route } />
				<CreatePostForm />
				<Posts />
			</main>
		</>
	)
}

export default News
