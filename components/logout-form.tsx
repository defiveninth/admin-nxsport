'use client'

import { FC, FormEvent } from 'react'

import { LogOut } from 'lucide-react'

import logout from '@/acion/logout'

interface ILogoutFormProps {
	S: { readonly [key: string]: string }
}

const LogoutForm: FC<ILogoutFormProps> = ({ S }) => {
	const logginOut = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await logout()
	}

	return (
		<>
			<form className={'flex flex-col'} onSubmit={logginOut}>
				<button className={S.nvItem}>
					<LogOut height={20} width={20} />
					<span>Выйти</span>
				</button>
			</form>
		</>
	)
}

export default LogoutForm
