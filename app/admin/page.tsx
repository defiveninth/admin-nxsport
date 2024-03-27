import { FC } from 'react'
import { Home } from 'lucide-react'
import Link from 'next/link'

import NavArrow from '@/components/navArrow'

import S from '@/styles/navBar.module.css'
import S1 from '@/styles/main.module.css'
import TechWork from '@/components/techWork'

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
			<section className={S1.techWork}>
				<TechWork />
			</section>
		</>
	)
}

export default MainPage
