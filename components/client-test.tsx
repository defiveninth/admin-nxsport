'use client'

import { FC } from 'react'
import { useSearchParams } from 'next/navigation'

const ClientTest: FC = () => {
	const P = useSearchParams()

	if (P.has('change-password') && P.get('change-password') === 'true') {
		return (
			<div>Ваш пароль успешно изменен. Для безопасности </div>
		)
	}
}

export default ClientTest
