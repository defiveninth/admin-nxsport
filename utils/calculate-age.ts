const calculateAge = (birthDateString?: string) => {
	if (!birthDateString) return ''
	const birthDate = new Date(birthDateString)
	const currentDate = new Date()

	let age = currentDate.getFullYear() - birthDate.getFullYear()

	if (
		currentDate.getMonth() < birthDate.getMonth() ||
		(currentDate.getMonth() === birthDate.getMonth() &&
			currentDate.getDate() < birthDate.getDate())
	) {
		age--
	}

	return age
}

export default calculateAge
