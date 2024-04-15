import { Dispatch, SetStateAction } from 'react'

interface IAdminInputProps {
	query: string;
	setQuery: Dispatch<SetStateAction<string>>
}

export default IAdminInputProps
