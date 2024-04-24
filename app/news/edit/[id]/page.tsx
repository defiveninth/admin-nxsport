'use client'

import { FC } from 'react'
import IRoute from '@/types/route'
import { Newspaper, Pencil } from 'lucide-react'
import Nav from '@/components/nav/nav'
import CurrentRoute from '@/components/current-route'

const route: Array<IRoute> = [
	{
		icon: Newspaper,
		route: 'Новости',
		url: '/news',
	},
	{
		icon: Pencil,
		route: 'Редактировать',
		url: '/news/edit',
	},
]

interface INewsEditProps {
	params: { id: string }
}

const NewsEdit: FC<INewsEditProps> = ({ params: { id } }) => {
	return (
		<>
			<title>Нархоз Спорт | Редактировать Пост</title>
			<Nav now='news' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				123
			</main>
		</>
	)
}

export default NewsEdit
