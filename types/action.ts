interface Action {
	id: number
	action: string
	date: Date
	userName: string
	userSurname: string
	userId: number
	userRole: 0 | 1
}

export default Action
