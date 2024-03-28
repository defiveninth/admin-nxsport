'use client'

import { FC } from 'react'

import IStudentParams from '@/types/student-params'

const Student: FC<IStudentParams> = ({ params: { id } }) => {
	return <div>Student {id}</div>
}

export default Student
