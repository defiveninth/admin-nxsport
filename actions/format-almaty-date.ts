const formatAlmatyDate = (date: Date | undefined) => {
	return date?.toLocaleString('en-US', {
		timeZone: 'Asia/Almaty',
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
}

export default formatAlmatyDate
