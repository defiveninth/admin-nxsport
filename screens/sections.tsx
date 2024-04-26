'use client'

import { FC, useEffect, useState } from 'react'
import SectionsInput from '../components/sections-input'
import SectionsList from '../components/sections-list'
import ISection from '@/types/sections'

const SectionsPage: FC = () => {
	const [sections, setSections] = useState<Array<ISection>>([])
	const [query, setQuery] = useState<string>('')

	useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sections/get-all`);
        if (!response.ok) {
          throw new Error('Failed to fetch sections');
        }
        const sectionsData = await response.json();
        setSections(sectionsData);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

	return (
		<>
			<SectionsInput
				query={query}
				setQuery={setQuery}
			/>
			<SectionsList
				query={ query }
				sections={ sections }
			/>
		</>
	)
}

export default SectionsPage
