import React, { FC } from 'react'
import { UserRoundCheck } from 'lucide-react'
import IUserData from '@/types/user-data'
import S from '@/styles/admin-list.module.css'

const AdminCard: FC<IUserData> = ({ id, name, surname, username, isSuperUser }) => {
	return (
		<div key={id} className={S.listCard}>
			<UserRoundCheck />
			<div className={S.seperator} />
			<p className={S.name}>
				{name} {surname}
			</p>
			<div className={S.seperator} />
			<p className={S.username}>@{username}</p>
		</div>
	)
}

export default AdminCard
