import { FC } from 'react'
import { Home } from 'lucide-react'
import Link from 'next/link'

import NavArrow from '@/components/navArrow'
import StudentList from '@/components/student-list'

import S from '@/styles/navBar.module.css'
import S1 from '@/styles/main.module.css'

const StudentPage: FC = () => {
	return (
		<>
			<div className={S.navBar}>
				<NavArrow />
				<Link className={S.navItem} href='/admin/students/'>
					<Home width={17} />
					<span>Студенты</span>
				</Link>
			</div>
			<section className={S1.techWork}>
				<StudentList />
			</section>
		</>
	)
}

export default StudentPage
