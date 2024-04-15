import { FC } from 'react'
import type { Metadata } from 'next'
import { Bolt } from 'lucide-react'
import Nav from '@/components/nav'
import CurrentRoute from '@/components/current-route'
import IRoute from '@/types/route'

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Настройки',
}

const route: Array<IRoute> = [
	{
		icon: Bolt,
		route: 'Настройки',
		url: '/settings'
	},
]

const softColors = [
	'#F0F8FF', // Alice Blue
	'#F0FFFF', // Azure
	'#F5F5F5', // White Smoke
	'#F8F8FF', // Ghost White
	'#F0FFF0', // Honeydew
	'#FAEBD7', // Antique White
	'#F0E68C', // Khaki
	'#FFF5EE', // Sea Shell
	'#F5FFFA', // Mint Cream
	'#FDF5E6', // Old Lace
]

const SettingsPage: FC = () => {
	return (
		<>
			<Nav now='settings' />
			<main className='ml-[320px]'>
				<CurrentRoute route={ route } />
				{softColors.map((color, index) => (
					<span
						key={index}
						style={{
							backgroundColor: color,
							padding: '50px',
							margin: '5px',
							display: 'inline-block',
						}}
					></span>
				))}
			</main>
		</>
	)
}

export default SettingsPage
