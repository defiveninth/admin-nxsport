'use client'

import { FC, useState, useEffect } from 'react';
import { BookA, Edit3 } from 'lucide-react';
import CurrentRoute from '@/components/current-route';
import Nav from '@/components/nav/nav';
import IRoute from '@/types/route';
import ISection from '@/types/sections'
import ISecionEditProps from '@/types/section-edit.props'

const SectionEdit: FC<ISecionEditProps> = ({ params: { id } }) => {
  const [section, setSection] = useState<ISection>({
    id: 0,
    name: '',
    description: '',
    type_section: 0,
  });

	const route: Array<IRoute> = [
		{
			icon: BookA,
			route: 'Секций',
			url: '/sections',
		},
		{
			icon: Edit3,
			route: 'Редактировать',
			url: '/sections/edit',
		},
		{
			icon: BookA,
			route: section.name,
			url: `sections/edit/${section.id}`,
		},
	]

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await fetch('http://localhost:3001/sections/get-single', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: parseInt(id) }), 
        });
        if (!response.ok) {
          throw new Error('Failed to fetch section');
        }
        const sectionData = await response.json();
        setSection(sectionData);
      } catch (error) {
        console.error('Error fetching section:', error);
      }
    };

    fetchSection()
  }, [id])

  return (
    <>
      <title>Нархоз Спорт | Редактировать Секцию</title>
      <Nav now='sections' />
      <main className='ml-[320px]'>
        <CurrentRoute route={route} />
        {JSON.stringify(section)}
      </main>
    </>
  );
};

export default SectionEdit;
