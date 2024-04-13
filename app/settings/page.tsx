import { FC } from 'react'
import type { Metadata } from 'next'
import Nav from '@/components/nav'

export const metadata: Metadata = {
	title: 'Нархоз Спорт | Настройки',
}

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

const Controll: FC = () => {
	return (
		<>
			<Nav now='sections' />
			<main className='ml-[320px]'>
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

export default Controll
