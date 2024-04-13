'use client'

import { FC, useId } from 'react'
import { AtSign, KeyRound } from 'lucide-react'
import S from '@/styles/auth-form.module.css'

const AuthForm: FC = () => {
	const usernameId: string = useId()
	const passwordId: string = useId()
	
	return (
		<>
			<form className={ S.form }>
				<label htmlFor={ usernameId }>
					<AtSign />
					<span>Логин:</span>
				</label>
				<input minLength={5} type='text' placeholder='user123' id={ usernameId } />
				<label htmlFor={ passwordId }>
					<KeyRound />
					<span>Пароль:</span>
				</label>
				<input minLength={5} type='password' placeholder='pass123' id={ passwordId } />
				<button type='submit'>Войти</button>
			</form>
		</>
	)
}

export default AuthForm
