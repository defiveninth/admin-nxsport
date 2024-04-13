import { FC } from 'react'
import Link from 'next/link'

interface INavItemProps {
  icon: FC<any>
  text: string
	now: boolean
}

const NavItem: FC<INavItemProps> = ({ icon: Icon, text, now }) => {
  return (
    <>
      <Link href={'/sections'} className='px-6 py-4 flex gap-4'>
        <Icon />
        <span>{text}</span>
      </Link>
    </>
  )
}

export default NavItem
