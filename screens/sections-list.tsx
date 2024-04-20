import { FC } from 'react'
import ISectionsListProps from '@/types/section-list.props'

const SectionsList: FC<ISectionsListProps> = ({ query, sections }) => {
  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <div className='mr-5 flex flex-col gap-5 mt-5 items-center'>
        {filteredSections.map(s => (
          <div key={s.id} className='bg-red-50 p-5 rounded-2xl w-[888px]'>
            <h3 className='font-medium text-lg'>{s.name}</h3>
            <p className='text-gray-900'>{s.description}</p>
            <p>Type: {s.type_section}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default SectionsList
