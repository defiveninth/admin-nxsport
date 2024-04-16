interface IPostData {
	id: number
	title: string
	description: string
	date: string
	borderColor: string
}

export type createPostData = Pick<IPostData, 'title' | 'description'>
export default IPostData
