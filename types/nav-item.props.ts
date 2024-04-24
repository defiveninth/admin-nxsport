import { FC } from 'react'

interface INavItemProps {
  icon: FC<any>
  text: string
	now: boolean
  to: '/sections' | '/news' | '/actions' | '/calendar' | '/coaches' | '/students' | '/settings'
}

export default INavItemProps
