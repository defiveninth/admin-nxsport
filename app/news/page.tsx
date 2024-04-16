'use client'

import { FC, useState, useEffect } from 'react'
import { Newspaper } from 'lucide-react'
import CurrentRoute from '@/components/current-route'
import Nav from '@/components/nav'
import Posts from '@/components/news'
import CreatePostForm from '@/components/create-post-form'
import IRoute from '@/types/route'
import IPostData from '@/types/post-data'

const route: Array<IRoute> = [
	{
		icon: Newspaper,
		route: 'Новости',
		url: '/news',
	},
]

const News: FC = () => {
	const [posts, setPosts] = useState<Array<IPostData>>([])

	const fetchPosts = async () => {
		try {
			const response = await fetch('http://localhost:3001/news/all')
			if (!response.ok) {
				throw new Error('Failed to fetch posts')
			}
			const postData = await response.json()

			const postsWithBorderColor = postData.map((post: IPostData) => ({
				...post,
				borderColor: getRandomHexColor(),
			}))

			setPosts(postsWithBorderColor.reverse())
		} catch (error) {
			console.error('Error fetching posts:', error)
		}
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	const getRandomHexColor = () => {
		const red = Math.floor(Math.random() * 256)
		const green = Math.floor(Math.random() * 256)
		const blue = Math.floor(Math.random() * 256)

		const hexRed = red.toString(16).padStart(2, '0')
		const hexGreen = green.toString(16).padStart(2, '0')
		const hexBlue = blue.toString(16).padStart(2, '0')

		return `#${hexRed}${hexGreen}${hexBlue}`
	}

	const handleReFetch = () => {
		fetchPosts()
	}

	return (
		<>
			<title>Нархоз Спорт | Новости</title>
			<Nav now='news' />
			<main className='ml-[320px]'>
				<CurrentRoute route={route} />
				<CreatePostForm handleReFetch={ handleReFetch } />
				<Posts posts={posts} handleReFetch={handleReFetch} />
			</main>
		</>
	)
}

export default News
