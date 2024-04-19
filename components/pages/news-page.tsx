'use client'

import { FC, useState, useEffect } from 'react'
import CreatePostForm from '../create-post-form'
import Posts from '../news'
import IPostData from '@/types/post-data'
import getRandomHexColor from '@/actions/get-random-hex-colr'

const NewsPage: FC = () => {
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

	return (
		<>
				<CreatePostForm handleReFetch={ fetchPosts } />
				<Posts posts={posts} handleReFetch={fetchPosts} />
		</>
	)
}

export default NewsPage