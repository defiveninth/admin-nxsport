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
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error)
		}
	}

	useEffect(() => {
		fetchStudents()
	}, [])

	return (
		<div className={styles['cool-table']}>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Фамилия</th>
						<th>Имя</th>
						<th>Почта</th>
						<th>Подтверден</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student: Student) => (
						<tr key={student.id}>
							<td>{student.id}</td>
							<td>{student.first_name}</td>
							<td>{student.last_name}</td>
							<td>{student.email}</td>
							<td>{student.verify}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default StudentList
