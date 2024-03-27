import { ChangeEvent } from 'react'

type InputProps = {
	L: string,
	S: { readonly [key: string]: string; },
	I: string,
	T: 'text' | 'password',
	V: string | undefined,
	O: (e: ChangeEvent<HTMLInputElement>) => void,
	N: 'username' | 'password'
}

export default InputProps
