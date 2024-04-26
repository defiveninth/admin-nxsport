'use client'

import getRandomHexColor from '@/actions/get-random-hex-colr'
import IPostData from '@/types/post-data'
import { FC, useEffect, useState } from 'react'
import CreatePostForm from '../components/create-post-form'
import Posts from '../components/news'

const NewsPage: FC = () => {
	const [posts, setPosts] = useState<Array<IPostData>>([])

	const fetchPosts = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/all`)
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

	return (
		<>
			<CreatePostForm handleReFetch={fetchPosts} />
			<Posts posts={posts} handleReFetch={fetchPosts} />
		</>
	)
}

export default NewsPage
