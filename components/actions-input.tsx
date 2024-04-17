import {
	Dispatch,
	FC,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
} from 'react'
import { Filter, FilterX, X } from 'lucide-react'
import S from '@/styles/admin-input.module.css'

interface IActionsInputProps {
	query: string
	setQuery: Dispatch<SetStateAction<string>>
	isFilterOpen: boolean
	setIsFilterOpen: Dispatch<SetStateAction<boolean>>
}

const ActionsInput: FC<IActionsInputProps> = ({
	query,
	setQuery,
	isFilterOpen,
	setIsFilterOpen,
}) => {
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
					<X onClick={ () => setQuery('') } />
				) : (
					<>
						<kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
						<kbd>+</kbd>
						<kbd>K</kbd>
					</>
				)}
			</label>
			<button className='filter' onClick={() => setIsFilterOpen(!isFilterOpen)}>
				{isFilterOpen ? (
					<>
						<FilterX />
						<span>Закрыть</span>
					</>
				) : (
					<>
						<Filter />
						<span>Фильтр</span>
					</>
				)}
			</button>
		</div>
	)
}

export default ActionsInput
