import { FC } from 'react'
import { Newspaper } from 'lucide-react'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import NewsPage from '@/components/pages/news-page'
import IRoute from '@/types/route'

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
