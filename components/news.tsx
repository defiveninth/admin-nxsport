'use client'

import { FC } from 'react'
import NewsDropdown from './news-dropdown'
import IPostData from '@/types/post-data'

interface IPostsProps {
	posts: Array<IPostData>;
	handleReFetch: () => void
}

const Posts: FC<IPostsProps> = ({ posts, handleReFetch }) => {
	return (
		<div>
			{posts.map(post => (
				<div key={post.id} className='flex justify-center mt-5'>
					<div
						className='w-full max-w-[888px] bg-[#fff8f8] p-5 rounded-lg'
						style={{
							borderBottom: `solid 2px ${post.borderColor}`,
						}}
					>
						<div className='flex justify-between mb-2 items-center'>
							<h2 className='text-xl font-semibold'>{post.title}</h2>
							<div className='flex items-center gap-5'>
								<p className='font-semibold text-sm'>
									{post.date.split('-').reverse().join('.')}
								</p>
								<NewsDropdown postId={ post.id } handleReFetch={ handleReFetch } />
							</div>
						</div>
						<p>{post.description}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default Posts
