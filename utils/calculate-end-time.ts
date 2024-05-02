const calculateEndTime = (startTime: string) => {
	const start = new Date(`2000-01-01T${startTime}`);
	const end = new Date(start.getTime() + 100 * 60 * 1000);
	const endHour = end.getHours().toString().padStart(2, '0');
	const endMinute = end.getMinutes().toString().padStart(2, '0');
	return `${endHour}:${endMinute}`;
};

export default calculateEndTime
