import { FC } from 'react'

interface INavItemProps {
  icon: FC<any>
  text: string
	now: boolean
  to: '/sections' | '/news' | '/actions' | '/admins' | '/coaches' | '/students' | '/settings/change-password'
}

export default INavItemProps
