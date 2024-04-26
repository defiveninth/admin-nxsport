import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { EllipsisVertical, Pencil, CircleX } from 'lucide-react'
import INewsDropdownProps from '@/types/news-dropdown.props'

const SectionsDropDown: FC<INewsDropdownProps> = ({ 
	postId, handleReFetch
}) => {
	const routeHandler = useRouter()

	const deletePost = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/sections/delete`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ id: postId })
				}
			)

			if (!response.ok) throw new Error(`Failed to delete post with ID ${postId}`)

			handleReFetch()
		} catch (error) {
			console.error('Error deleting post:', error)
		}
	}

	return (
		<>
			<div className='dropdown dropdown-left'>
				<div tabIndex={0} role='button'>
					<EllipsisVertical width={20} height={20} />
				</div>
				<ul
					tabIndex={0}
					className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
				>
					<li>
						<button className='flex items-center gap-4' onClick={() => routeHandler.push(`sections/edit/${postId}`)}>
							<Pencil width={18} height={18} />
							<span>Редактировать</span>
						</button>
					</li>
					<li>
						<button className='flex items-center gap-4' onClick={deletePost}>
							<CircleX width={18} height={18} />
							<span>Удалить</span>
						</button>
					</li>
				</ul>
			</div>
		</>
	)
}

export default SectionsDropDown
