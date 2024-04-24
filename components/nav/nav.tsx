import S from '@/styles/nav-bar.module.css'
import INavProps from '@/types/nav.props'
import {
	Activity,
	Bolt,
	BookA,
	GraduationCap,
	Newspaper,
	TrainFront,
	CalendarCheck2
} from 'lucide-react'
import { FC } from 'react'
import NavItem from './nav-item'
import NavTitle from './nav-title'
import ProfileCard from './profile-card'

const Nav: FC<INavProps> = ({ now }) => {
	return (
		<>
			<nav className={S.nav}>
				<ProfileCard />
				<NavTitle text='Меню' />
				<NavItem
					to='/sections'
					icon={BookA}
					text='Секций'
					now={now === 'sections'}
				/>
				<NavItem
					to='/calendar'
					icon={CalendarCheck2}
					text='Расписание Секций'
					now={now === 'calendar'}
				/>
				<NavItem
					to='/news'
					icon={Newspaper}
					text='Новости'
					now={now === 'news'}
				/>
				<NavItem
					to='/actions'
					icon={Activity}
					text='Действий'
					now={now === 'actions'}
				/>
				<NavTitle text='Пользователей' />
				<NavItem
					to='/coaches'
					icon={TrainFront}
					text='Тренеры'
					now={now === 'coaches'}
				/>
				<NavItem
					to='/students'
					icon={GraduationCap}
					text='Студенты'
					now={now === 'students'}
				/>
				<NavTitle text='Другие' />
				<NavItem
					to='/settings'
					icon={Bolt}
					text='Настройки'
					now={now === 'settings'}
				/>
			</nav>
		</>
	)
}

export default Nav
