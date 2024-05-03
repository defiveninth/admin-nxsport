import { ChangeEvent, FC } from 'react'
import Link from 'next/link'
import { CirclePlus } from 'lucide-react'

interface Props {
	onSearch: (searchText: string) => void
	value: string
}

const SearchBar: FC<Props> = ({ onSearch, value }) => {

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		onSearch(e.target.value)
	}

	return (
		<div className='flex mr-5'>
			<input
				type='text'
				placeholder='Пойск по имени:'
				className='input input-bordered w-full'
				value={value}
				onChange={handleSearchChange}
			/>
			<Link
				href={'/calendar/add'}
				className='bg-red-500 hover:bg-red-600 px-4 ml-3 rounded-lg border-black flex items-center gap-3 text-white text-sm'
			>
				<CirclePlus />
				<span>Добавить</span>
			</Link>
		</div>
	)
}

export default SearchBar
