import { FC } from 'react'

interface INavItemProps {
  icon: FC<any>
  text: string
	now: boolean
  to: '/controll' | '/news' | '/actions' | '/admins' | '/coaches' | '/students' | '/settings/change-password'
}

export default INavItemProps