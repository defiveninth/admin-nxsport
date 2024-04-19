import NewsPage from '@/_pages/news'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import IRoute from '@/types/route'
import { Newspaper } from 'lucide-react'
import { FC } from 'react'

const route: Array<IRoute> = [
	{
		icon: Newspaper,
		route: 'Новости',
		url: '/news',
	},
]

const News: FC = () => {
	return (
		<>
			<title>Нархоз Спорт | Новости</title>
			<Nav now='news' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<NewsPage />
			</main>
		</>
	)
}

export default News
