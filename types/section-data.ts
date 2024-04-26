export interface SectionData {
	id: number
	training_time: string
	type: number
	quantity: number
	busy: number
	section_info: {
		id: number
		name: string
		description: string
		type_section: number
	}
	trainer_info: {
		id: number
		user_id: number
		type_section: number
		position: string
	}
	date: {
		id: number
		name: string
		value: number
	}
	place: {
		id: number
		name: string
	}
}

export interface GroupedData {
	day: string
	sections: SectionData[]
}
