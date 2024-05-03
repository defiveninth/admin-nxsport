import React, { FC } from 'react'
import { CircleX, EllipsisVertical, Pencil } from 'lucide-react'

interface ICalendarDropdownProps {
	handleReFetch: () => void
}

const CalendarDropdown: FC<ICalendarDropdownProps> = () => {
	

	return (
		<>
			<div className='ml-auto dropdown dropdown-end'>
				<div tabIndex={0} role='button'>
					<EllipsisVertical />
				</div>
				<ul
					tabIndex={0}
					className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
				>
					<li>
						<button className='flex gap-5'>
							<CircleX className='text-black' width={20} height={20} />
							<span>Удалить</span>
						</button>
					</li>
					<li>
						<button className='flex gap-5'>
							<Pencil className='text-black' width={20} height={20} />
							<span>Редактировать</span>
						</button>
					</li>
				</ul>
			</div>
		</>
	)
}

export default CalendarDropdown
