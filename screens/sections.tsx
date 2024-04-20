'use client'

import { FC, useState } from 'react'
import SectionsInput from '../components/sections-input'
import SectionsList from './sections-list'
import Action from '@/types/action'

const SectionsPage: FC = () => {
	const [actions, setActions] = useState<Array<Action>>([])
	const [query, setQuery] = useState<string>('')
	return (
		<>
			<SectionsInput
				query={query}
				setQuery={setQuery}
			/>
			<SectionsList
				query={ query }
			/>
		</>
	)
}

export default SectionsPage
