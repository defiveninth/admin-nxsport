import { FC } from 'react'
import { EllipsisVertical, Pencil, CircleX } from 'lucide-react'

interface INewsDropdownProps {
	postId: number
}

const NewsDropdown: FC<INewsDropdownProps> = ({ postId }) => {
	const editPost = () => {
		console.log('edit post' + postId)
	}

	const deletePost = () => {
		console.log('delete post' + postId)
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
						<button className='flex items-center gap-4' onClick={ editPost }>
							<Pencil width={18} height={18} />
							<span>Редактировать</span>
						</button>
					</li>
					<li>
						<button className='flex items-center gap-4' onClick={ deletePost }>
							<CircleX width={18} height={18} />
							<span>Удалить</span>
						</button>
					</li>
				</ul>
			</div>
		</>
	)
}

export default NewsDropdown
