import { FC } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import R from '@/types/current-route.props'

const CurrentRoute: FC<R> = ({ route }) => {
	return (
		<div className='bg-[#EFEEFF] mt-5 p-4 flex mr-5 rounded-2xl mb-5'>
			{route.map(r => (
					<Link
						href={r.url}
						key={r.route}
						className='flex gap-2 text-sm items-center mr-2 ml-1'
					>
						<ChevronRight key={r.route} />
						<r.icon width={18} height={18} /> {r.route}
					</Link>
			))}
		</div>
	)
}

export default CurrentRoute
