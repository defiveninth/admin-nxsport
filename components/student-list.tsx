'use client'

import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import getToken from '@/acion/get-token'
import SERVER from '@/data/url'
import Student from '@/types/student'

import styles from '@/styles/studentList.module.css'

const StudentList: FC = () => {
	const [students, setStudents] = useState<Array<Student>>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [searchQuery, setSearchQuery] = useState<string>('')

	const router = useRouter()
	
	const fetchStudents = async () => {
		try {
			const token = await getToken()

			const response = await fetch(`${SERVER}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
			})

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			const { users } = await response.json()
			setStudents(users)
			setLoading(false)
		} catch (error) {
			setError('There was a problem with fetching students data.')
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchStudents()
	}, [])

	const filteredStudents = students.filter(student =>
		`${student.id} ${student.first_name} ${student.last_name} ${student.email}`
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	)

	const removeUser = async (id: number) => {
		try {
			const token = await getToken()

			const response = await fetch(`${SERVER}/user/delete`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id, token }),
			})

			if (!response.ok) {
				throw new Error('Network response was not ok')
			}

			setStudents(prevStudents =>
				prevStudents.filter(student => student.id !== id)
			)
		} catch (error) {
			console.error('Error deleting user:', error)
		}
	}

	return (
		<div className={styles['container']}>
			{loading ? (
				<div className='flex justify-center'>
					<span className='loading loading-spinner text-error'></span>
				</div>
			) : error ? (
				<div className={styles['error']}>{error}</div>
			) : students.length === 0 ? (
				<div className={styles['empty']}>No students found.</div>
			) : (
				<div className={styles['cool-table']}>
					<div className='flex flex-col gap-2 pb-5'>
						<input
							type='text'
							placeholder='Поиск по id, ФИО или почте:'
							className='p-4 m-1 bg-zinc-300 outline-none border-none focus:border focus:border-y-red-300 focus:border-solid rounded-lg'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
						<div role='alert' className='alert'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								className='stroke-info shrink-0 w-6 h-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								></path>
							</svg>
							<span>
								Чтобы увидеть дисциплины пользователя нажмите на него.
							</span>
						</div>
					</div>
					<table>
						<thead>
							<tr>
								<th></th>
								<th>Фамилия</th>
								<th>Имя</th>
								<th>Почта</th>
								<th>Подтвержден</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{filteredStudents.map((student: Student) => (
								<tr key={student.id} onClick={() => router.push(`/admin/students/${student.id}`)}>
									<td>{student.id}</td>
									<td>{student.last_name}</td>
									<td>{student.first_name}</td>
									<td>{student.email}</td>
									<td
										className={
											student.verify
												? 'text-blue-500 font-semibold'
												: 'text-red-500 font-semibold'
										}
									>
										{student.verify ? 'да' : 'нет'}
									</td>
									<td>
										<button onClick={() => removeUser(student.id)}>
											<Trash2 />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}

export default StudentList
