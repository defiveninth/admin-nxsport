'use client'

import { FC, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CirclePlus } from 'lucide-react'

const AdminList: FC = () => {
	const inputRef = useRef<HTMLInputElement>(null)

	const isMac = typeof window !== 'undefined' && window.navigator.platform === 'MacIntel'

	const handleShortcut = (event: KeyboardEvent) => {
		if ((isMac ? event.metaKey : event.ctrlKey) && event.key === 'k') {
			event.preventDefault()
			if (inputRef.current) {
				inputRef.current.focus()
			}
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleShortcut)

		return () => {
			document.removeEventListener('keydown', handleShortcut)
		}
	}, [])

	return (
		<>
			<div className='mr-5 flex gap-5'>
				<label className='input input-bordered flex items-center gap-2 grow'>
					<input
						ref={inputRef}
						type='text'
						className='grow'
						placeholder='Search'
					/>
					<kbd className='kbd kbd-sm'>{isMac ? '⌘' : 'Ctrl'}</kbd>
					<kbd className='kbd kbd-sm'>+</kbd>
					<kbd className='kbd kbd-sm'>K</kbd>
				</label>
				<Link
					href={'admins/add'}
					className='bg-[#7875c3] px-7 rounded-lg font-medium hover:bg-[#9c99ec] transition-all	text-white flex items-center gap-2'
				>
					<CirclePlus />
					<span>Добавить админа</span>
				</Link>
			</div>
		</>
	)
}

export default AdminList
