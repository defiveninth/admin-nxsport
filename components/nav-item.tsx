import { FC } from 'react'
import Link from 'next/link'
import INavItemProps from '@/types/nav-item.props'

const NavItem: FC<INavItemProps> = ({ icon: Icon, text, now, to }) => {
  return (
    <>
      <Link href={to} className={`px-6 py-4 flex gap-4 rounded-xl ${now && 'bg-[#ffeeee] text-[#ff6060]'}`}>
        <Icon />
        <span>{text}</span>
      </Link>
    </>
  )
}

export default NavItem
