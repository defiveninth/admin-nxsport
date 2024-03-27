import { FC } from 'react'
import { Home } from 'lucide-react'
import Link from 'next/link'

import S from '@/styles/navBar.module.css'
import NavArrow from '@/components/navArrow'

const MainPage: FC = () => {
	return (
		<>
			<div className={S.navBar}>
				<NavArrow />
				<Link className={S.navItem} href='/admin'>
					<Home width={17} />
					<span>Главная</span>
				</Link>
			</div>
		</>
	)
}

export default MainPage
