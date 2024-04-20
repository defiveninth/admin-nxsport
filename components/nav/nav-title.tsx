import { FC } from 'react'
import NavTitleProps from '@/types/nav-title.props'
import S from '@/styles/nav-bar.module.css'

const NavTitle: FC<NavTitleProps> = ({ text }) => {
  return (
    <>
      <span className={ S.navTitle }>{text}:</span>
    </>
  )
}

export default NavTitle
