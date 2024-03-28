import Link from 'next/link'
import Image from 'next/image'

import { Home, Users, Notebook, Bolt, LogOut } from 'lucide-react'
import LogoutForm from '@/components/logout-form'

import toOutside from '@/acion/getOutside'

import S from '@/styles/nv.module.css'

export default async function DashboardLayout ({
	children,
}: {
	children: React.ReactNode
}) {
	await toOutside()
	return (
		<>
			<nav className={S.nv}>
				<div>
					<Image alt='icon' src={'/nx-icon.svg'} width={100} height={100} />
				</div>
				<Link href={'/admin'} className={S.nvItem}>
					<Home height={20} width={20} />
					<span>Главная</span>
				</Link>
				<Link href={'/admin/students'} className={S.nvItem}>
					<Users height={20} width={20} />
					<span>Студенты</span>
				</Link>
				<Link href={'/admin/disciplines'} className={S.nvItem}>
					<Notebook height={20} width={20} />
					<span>Дисциплины</span>
				</Link>
				<Link href={'/admin/settings'} className={S.nvItem}>
					<Bolt height={20} width={20} />
					<span>Настройки</span>
				</Link>
				<LogoutForm S={S} />
			</nav>
			<main className={S.main}>{children}</main>
		</>
	)
}
