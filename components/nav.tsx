import { FC } from 'react'
import { BookA, GraduationCap, UserCheck, TrainFront, Newspaper, Activity, KeyRound } from 'lucide-react'
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
				<NavItem to='/sections' icon={BookA} text='Секций' now={ now === 'sections' } />
				<NavItem to='/news' icon={Newspaper} text='Новости' now={ now === 'news' } />
				<NavItem to='/actions' icon={Activity} text='Действий' now={ now === 'actions' } />
				<NavTitle text='Пользователей' />
				<NavItem to='/admins' icon={UserCheck} text='Админы' now={ now === 'admins' } />
				<NavItem to='/coaches' icon={TrainFront} text='Тренеры' now={ now === 'coaches' } />
				<NavItem to='/students' icon={GraduationCap} text='Студенты' now={ now === 'students' } />
				<NavTitle text='Настройки' />
				<NavItem to='/settings/change-password' icon={KeyRound} text='Изменить пароль' now={ now === 'settings/change-password' } />
			</nav>
		</>
	)
}

export default Nav
