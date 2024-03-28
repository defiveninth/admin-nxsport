'use client'

import { FC, useEffect, useState } from 'react'
import getToken from '@/acion/get-token'
import SERVER from '@/data/url'

import styles from '@/styles/studentList.module.css'

interface Student {
	id: number
	first_name: string
	last_name: string
	email: string
	verify: 0 | 1
}

const StudentList: FC = () => {
	const [students, setStudents] = useState<Array<Student>>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

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
					<table>
						<thead>
							<tr>
								<th></th>
								<th>Фамилия</th>
								<th>Имя</th>
								<th>Почта</th>
								<th>Подтвержден</th>
							</tr>
						</thead>
						<tbody>
							{students.map((student: Student) => (
								<tr key={student.id}>
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
