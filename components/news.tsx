'use client'

import { FC } from 'react'
import NewsDropdown from './news-dropdown'
import IPostData from '@/types/post-data'

interface IPostsProps {
	posts: Array<IPostData>;
	deleter: (postId: number) => void
}

const Posts: FC<IPostsProps> = ({ posts, deleter }) => {


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
							<h2 className='text-xl font-semibold'>{post.id} {post.title}</h2>
							<div className='flex items-center gap-5'>
								<p className='font-semibold text-sm'>
									{post.date.split('-').reverse().join('.')}
								</p>
								<NewsDropdown postId={ post.id } />
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
