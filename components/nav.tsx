import { FC } from 'react'
import { BookA, GraduationCap, UserCheck, TrainFront, Newspaper, Activity } from 'lucide-react'
import ProfileCard from './profile-card'
import NavTitle from './nav-title'
import NavItem from './nav-item'
import INavProps from '@/types/nav.props'
import S from '@/styles/nav-bar.module.css'

const Nav: FC<INavProps> = ({ now }) => {
	return (
		<>
			<nav className={S.nav}>
				<ProfileCard />
				<NavTitle text='Меню' />
				<NavItem icon={BookA} text='Секций' now={ now === 'sections' } />
				<NavItem icon={Newspaper} text='Новости' now={ now === 'news' } />
				<NavItem icon={Activity} text='Действий' now={ now === 'actions' } />
				<NavTitle text='Пользователей' />
				<NavItem icon={UserCheck} text='Админы' now={ now === 'admins' } />
				<NavItem icon={TrainFront} text='Тренеры' now={ now === 'coaches' } />
				<NavItem icon={GraduationCap} text='Студенты' now={ now === 'students' } />
				<NavTitle text='Настройки' />
			</nav>
		</>
	)
}

export default Nav
