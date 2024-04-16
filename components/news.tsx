'use client'

import { FC, useState, useEffect } from 'react'

interface IPostData {
	id: number
	title: string
	description: string
	date: string
	borderColor: string // Add borderColor property to IPostData
}

const Posts: FC = () => {
	const [posts, setPosts] = useState<Array<IPostData>>([])

	useEffect(() => {
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

	return (
		<div>
			{posts.map(post => (
				<div key={post.id} className='flex justify-center mt-5'>
					<div
						className='w-full max-w-[888px] bg-[#F8F8FF] p-5 rounded-lg'
						style={{
							borderBottom: `solid 2px ${post.borderColor}`,	
						}}
					>
						<div className='flex justify-between mb-2 items-center'>
							<h2 className='text-xl font-semibold'>{post.title}</h2>
							<p className='font-semibold text-sm'>
								{post.date.split('-').reverse().join('-')}
							</p>
						</div>
						<p>{post.description}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default Posts
