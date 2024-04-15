import { FC, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CirclePlus } from 'lucide-react'
import IAdminInputProps from '@/types/admin-input.props'
import S from '@/styles/admin-input.module.css'

const AdminInput: FC<IAdminInputProps> = ({ query, setQuery }) => {
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
			<div className={ S.inputWrapper }>
				<label>
					<input
						ref={inputRef}
						type='text'
						placeholder='Пойск по имени, фамилий и юзернейм:'
						value={query}
						onChange={e => setQuery(e.target.value)}
					/>
					<kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
					<kbd>+</kbd>
					<kbd>K</kbd>
				</label>
				<Link href={'admins/add'}>
					<CirclePlus />
					<span>Добавить админа</span>
				</Link>
			</div>
		</>
	)
}

export default AdminInput
