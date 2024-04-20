import { FC, Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react'
import { CirclePlus, X } from 'lucide-react'
import Link from 'next/link'
import S from '@/styles/admin-input.module.css'

interface ISectionsInputProps {
	query: string
	setQuery: Dispatch<SetStateAction<string>>
}

const SectionsInput: FC<ISectionsInputProps> = ({ query, setQuery }) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const isMac =
		typeof window !== 'undefined' && window.navigator.platform === 'MacIntel'

	const handleShortcut = useCallback(
		(event: KeyboardEvent) => {
			if ((isMac ? event.metaKey : event.ctrlKey) && event.key === 'k') {
				event.preventDefault()
				if (inputRef.current) {
					inputRef.current.focus()
				}
			}
		},
		[inputRef, isMac]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleShortcut)

		return () => {
			document.removeEventListener('keydown', handleShortcut)
		}
	}, [handleShortcut])

	return (
		<>
			<div className={S.inputWrapper}>
				<label>
					<input
						ref={inputRef}
						type='text'
						placeholder='Пойск по имени, фамилий, юзернейм, действий и дате:'
						value={query}
						onChange={e => setQuery(e.target.value)}
					/>
					{query ? (
						<X
							onClick={() => setQuery('')}
							className='hover:bg-gray-300 p-1 rounded-full'
						/>
					) : (
						<>
							<kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
							<kbd>+</kbd>
							<kbd>K</kbd>
						</>
					)}
				</label>
				<Link href={'sections/create'} className='filter'>
					<CirclePlus />
					<span>Создать</span>
				</Link>
			</div>
		</>
	)
}

export default SectionsInput
