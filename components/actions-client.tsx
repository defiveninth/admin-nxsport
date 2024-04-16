'use client'

import { FC, useState } from 'react'
import ActionsInput from './actions-input'
import ActionsFilter from './actions-filter'

const ActionsPage: FC = () => {
	const [actions, setActions] = useState()
	const [query, setQuery] = useState<string>('')
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
	
	return (
		<>
			<ActionsInput query={ query } setQuery={ setQuery } isFilterOpen={ isFilterOpen } setIsFilterOpen={ setIsFilterOpen } />
			{ isFilterOpen && <ActionsFilter /> }
			<p>query: { query ? query : 'empty' }</p>
			<p>isFilterOpen: { isFilterOpen ? 'true' : 'false' }</p>
		</>
	)
}

export default ActionsPage
